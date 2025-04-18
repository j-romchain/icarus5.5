// @ts-check
const u = require("../utils/utils");
const c = require("../config/config.json");
const send = require("nodemailer");
const receive = require("imapflow");
const interpret = require("mailparser-mit");
const htmlparse = require("html-to-text");
const Augur = require("augurbot-ts");
const { ChannelType } = require("discord.js");
const replyRegexes = [
  // /^on[\s\n\r]+.+wrote:[\s\n\r]*$/im,
  // /on[\s\n\r]+.+wrote:[\s\n\r]*/im,
  /^on[^>]*@[^<]*wrote:\n\n>/im,
  // /^on\s.+wrote:\s*$/im,
  // /On\s.+wrote:\s*/im,
  /^>.*$/m,
  /^-+ original message -+$/m,
  /^from:.*$/m,
  /^sent:.*$/m,
  /^to:.*$/m,
  /^subject:.*$/m,
  /^date:.*$/m
];
/** @type {send.Transporter | undefined} */
let sender;
/** @type {receive.ImapFlow | undefined} */
let receiver;
async function logNPull() {
  const creds = c.google.mail;
  if (!creds.enabled) return;
  try {
    sender?.close();
    sender?.removeAllListeners();
    sender = undefined;
    receiver?.close();
    receiver?.removeAllListeners();
    receiver = undefined;
    sender = send.createTransport({
      service: 'gmail',
      auth: {
        type: "LOGIN",
        user: creds.email,
        pass: creds.gAccountAppPass,
        // clientId: creds.oAuthServerCreds.web.client_id,
        // clientSecret: creds.oAuthServerCreds.web.client_secret,
        // refreshToken: creds.gAccountRefreshToken,
      },
    });
    receiver = new receive.ImapFlow({
      auth: {
        user: creds.email,
        pass: creds.gAccountAppPass
      },
      host: 'imap.gmail.com',
      port: 993,
    });
    await receiver.connect();
    await receiver.mailboxOpen("INBOX");
    sendUnsent();
    receiver.on("exists", sendUnsent);

    await sender.verify();
    // console.log(`Mailer sender initialized for ${creds.email}`);
  } catch (e) {
    u.errorHandler(e, "missionmail init");
    sender = undefined;
    receiver = undefined;
  }
}
/**
 * @returns {Promise<number>}
 */
async function sendUnsent() {
  if (!receiver?.usable) {
    throw new Error("Missionary Email Receiver not usable, cannot check for new emails.");
  }
  const messageIds = (await receiver.search({ unKeyword: 'rickForwarded' }));// , from: "*@missionary.org" }))
  const messages = await receiver.fetchAll(messageIds, { source: true });
  for (const rawMsg of messages) {
    // parse the email source into readable stuff
    const parsed = await new Promise((resolve) => {
      const parser = new interpret.MailParser();
      parser.on("end", result => resolve(result));
      parser.write(rawMsg.source);
      parser.end();
    });
    // make sure there is text
    if (!parsed.text || parsed.text.length < 1) {
      if (parsed.html) {
        parsed.text = htmlparse.convert(parsed.html);
      } else {
        parsed.text = parsed.subject;
      }
    }
    if (!parsed.text) throw new Error("unable to parse email with no discrnable text, html, or subject");
    // trim the reply quote from the bottom if there is one (for some reason it was bypassing email replace)
    for (const regex of replyRegexes) {
      const match = parsed.text.toLowerCase().search(regex);
      if (match && match > 0) {
        // parsed.fullText = parsed.text;
        parsed.text = parsed.text.substring(0, match);
        break; // Stop after the first match to avoid over-trimming
      }
    }
    parsed.text = parsed.text.trimEnd();
    // figure out who it is from
    const fromEmail = parsed.from ? parsed.from[0].address : "Err:NoFromAddress";
    const missionaryId = await u.db.sheets.missionaries.findKey(address => fromEmail?.includes(address) ? address : false);
    // get some discord side of things stuff
    const ldsg = await module.exports.client.guilds.fetch(u.sf.ldsg);
    const missionary = missionaryId ? await ldsg.members.fetch(missionaryId) : undefined;
    const missionMail = await ldsg.channels.fetch(u.sf.channels.missionMail);
    if (!missionMail || missionMail.type !== ChannelType.GuildText) { throw new Error("unable to find approval channel for missionary emails."); }
    const embed = u.embed()
    .setAuthor({ name: missionary?.displayName ?? fromEmail.substring(0, fromEmail.indexOf('@')), iconURL: missionary?.avatarURL() ?? undefined })
    .setTitle(`${missionary?.displayName ?? fromEmail.substring(0, fromEmail.indexOf('@'))} - ${parsed.subject}`)
    .setDescription(parsed.text.replace(fromEmail, missionary?.displayName ?? fromEmail.substring(0, fromEmail.indexOf('@'))))
    .setTimestamp(parsed.receivedDate);
    // pop the question
    receiver.messageFlagsAdd([rawMsg.uid], ["rickForwarded"]);
    await missionMail.send({ embeds: [embed] });
  }
  return messages.length;
}

/** @param {Augur.GuildInteraction<"CommandSlash">} int */
async function slashMissionaryReInit(int) {
  if (!u.perms.calc(int.member, ["mod"])) return int.editReply("This command may only be used by Mods.");
  sender?.close();
  sender?.removeAllListeners();
  sender = undefined;
  receiver?.close();
  receiver?.removeAllListeners();
  receiver = undefined;
  await logNPull;
  await int.editReply("Emailer reinitialized.");
}
/** @param {Augur.GuildInteraction<"CommandSlash">} int */
async function slashMissionarySend(int) {
  const ldsg = await int.client.guilds.fetch(u.sf.ldsg);
  const pingMatch = /<@!?([0-9]+)>/.exec(int.options.getString("missionary", true));
  if (!pingMatch || !pingMatch[1]) { return int.editReply("You need to @ mention a registered missionaries discord account."); }
  const missionaryDiscord = await ldsg.members.fetch(pingMatch[1]);
  const content = int.options.getString("content", true);
  const email = u.db.sheets.missionaries.get(missionaryDiscord.id);
  if (!email) {
    return int.editReply(missionaryDiscord.user.toString() + " isn't a registered missionary. have them get in contact with a mod to link their missionary email.");
  }

  if (sender) {
    try {
      sender?.sendMail({
        to: email,
        subject: "LDSG Missionary email from " + int.member.displayName,
        text: content,
      });
      int.reply(`Your Missionary email to ${missionaryDiscord.user.toString()} was sent!\nContent:${content}`);
    } catch (error) {
      u.errorHandler(error, "slashMissionarySend");
      await int.editReply("Error sending email.");
    }
  } else {
    await int.editReply("Email sender is not initialized.");
  }
}
/** @param {Augur.GuildInteraction<"CommandSlash">} int */
async function slashMissionaryPull(int) {
  try {
    if (receiver?.usable) {
      await int.editReply("Missionary Email receiver is not ready.");
    }
    await int.editReply("Pulling Emails.");
    sendUnsent().then(
      (n) => int.editReply("Pulled Emails:" + n),
      (e) => {
        u.errorHandler(e, "slashMissionaryPull");
        int.editReply("Error pulling emails.");
      }
    );
  } catch (error) {
    u.errorHandler(error, "slashMissionaryPull");
    return await int.editReply("Error pulling emails.");
  }
}
/** @param {Augur.GuildInteraction<"CommandSlash">} int */
async function slashMissionaryRegister(int) {
  const user = int.options.getUser("user", false) ?? int.member;
  const email = int.options.getString("email", true);
  if (!email.endsWith("@missionary.org")) {return int.editReply("missionary emails must be part of @missionary.org");}
  if (u.db.sheets.missionaries.has(user.id)) {return int.editReply(`${user.toString()} already has email \`${email}\` registered. Remove that first to register a new one.`);}
  await u.db.sheets.data.docs?.config.sheetsByTitle.Mail.addRow({ "UserId": user.id, "Email": email });
  await u.db.sheets.loadData(int.client, true, false, "missionaries");
  await int.editReply(`Register command executed for ${user.toString()} setting email \`${email}\``);
}
/** @param {Augur.GuildInteraction<"CommandSlash">} int */
async function slashMissionaryRemove(int) {
  const user = int.options.getUser("user", false) ?? int.member;
  u.db.sheets.data.missionaries.find((row) => row.get("UserId") === user.id)?.delete();
  u.db.sheets.loadData(int.client, true, false, "missionaries");
  await int.editReply("Mission Email De-Registered.");
}
/** @param {Augur.GuildInteraction<"CommandSlash">} int */
async function slashMissionaryCheck(int) {
  const user = int.options.getUser("user", false) ?? int.member;
  return int.editReply(user.toString() + " has the following missionary email: `" + u.db.sheets.missionaries.findKey(id => id === user.id) + '`');
}
const Module = new Augur.Module()
  .setInit(logNPull)
  .setClockwork(() => {
    return setInterval(logNPull, 60 * 60_000);
  })
  .addInteraction({
    name: "missionary",
    id: u.sf.commands.slashMissionary,
    onlyGuild: true,
    hidden: true,
    permissions: (int) => u.perms.calc(int.member, ["trusted"]),
    process: async (int) => {
      const subcommand = int.options.getSubcommand(true);
      await int.deferReply({ flags: u.ephemeralChannel(int, u.sf.channels.missionMailApprovals) });
      if (!u.perms.calc(int.member, ["mod"])) return int.editReply("That command is only for mods.");
      switch (subcommand) {
        case "send": return slashMissionarySend(int);
        case "remove": return slashMissionaryRemove(int);
        case "check": return slashMissionaryCheck(int);
        case "register": return slashMissionaryRegister(int);
        case "pull": return slashMissionaryPull(int);
        case "reinit": return slashMissionaryReInit(int);
        default: return u.errorHandler(new Error("Unhandled Subcommand"), int);
      }
    },
    autocomplete: async (int) => {
      const ldsg = await int.client.guilds.fetch(u.sf.ldsg);
      // console.log(u.db.sheets.missionaries);
      const ret = await Promise.all(u.db.sheets.missionaries.map((_email, uid) => ldsg.members.fetch(uid).then(m => { return { name: m.user.username, value: m.user.toString() + "" }; })));
      // console.log(ret);
      await int.respond(ret);
      return ret;
    }
  });

module.exports = Module;