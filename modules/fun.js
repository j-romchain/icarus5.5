const { AxiosError } = require("axios");

// @ts-check
<<<<<<< Updated upstream
const Augur = require(`augurbot-ts`),
  Discord = require(`discord.js`),
  u = require(`../utils/utils`),
  axios = require('axios'),
  mineSweeperEmojis = { 0:'0⃣', 1:'1⃣', 2:'2⃣', 3:'3⃣', 4:'4⃣', 5:'5⃣', 6:'6⃣', 7:'7⃣', 8:'8⃣', 9:'9⃣', 10:'🔟', 'bomb':'💣' };
/**
 * function hug
 * @param {Discord.ChatInputCommandInteraction} int a /fun hug interaction
 */
async function slashFunHug(int) {
  const hugs = [
    `http://24.media.tumblr.com/72f1025bdbc219e38ea4a491639a216b/tumblr_mo6jla4wPo1qe89guo1_1280.gif`,
    `https://media.tenor.com/Uw927NM469EAAAAi/there-cheer.gif`
  ];
  const hugee = int.options.getUser(`hugee`) || { displayName:"ERRNOUSR", send: function() {u.errorLog.send({ embeds: [ u.embed().setDescription(`error, user argument on /hug didnt exist. someone messed up slashFun.js`) ] });} };
  try {
    const hugImg = u.rand(hugs);
    hugee.send({ content:`Incoming hug from **${int.user.username}**!`, files: [{ attachment:hugImg, name:`hug.gif` }] });
    // alternatively:
    // return int.editReply({ content:`**${int.user.username}** hugs **${hugee}**!`, files: [{ attachment:hugImg, name:`hug.gif` }] });
    // or just remove the .addSubcommand(hug) line from slashFun.js.
  } catch (e) {
    return int.editReply(`I couldn't send a hug to ${hugee.displayName}. Maybe they blocked me? :shrug:`);
  }
  return int.editReply(`Hug on the way!`);
}
/**
 * function color
 * @param {Discord.ChatInputCommandInteraction} int a /fun color interaction
 */
async function slashFunColor(int) {
  let colorCode = int.options.getString(`color`);
  if (!colorCode) {
    colorCode = `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;// generate random hex color
  }
  try {
    const Jimp = require(`jimp`);

    let colorCSS;
    if (colorCode.startsWith('0x')) {
      // In the case that we have a string in 0xABCDEF format
      colorCSS = `#${colorCode.substring(2)}`;
    } else {colorCSS = colorCode;}
    if (![`#000000`, `black`, `#000000FF`].includes(colorCSS)) {
      colorCSS = Jimp.cssColorToHex(colorCSS);
    }
    if (colorCSS != 255) {
      const img = new Jimp(256, 256, colorCSS);
      int.editReply({ files: [await img.getBufferAsync(Jimp.MIME_PNG)] });
    } else {
      int.editReply(`sorry, I couldn't understand the color ${colorCode}`);
    }
  } catch (error) {
    int.editReply(`sorry, I couldn't understand the color ${colorCode}`);
  }
}
const hbsValues = {
  'Buttermelon': { emoji: `<:buttermelon:${u.sf.emoji.buttermelon}>`, value: 0 },
  'Handicorn': { emoji: `<:handicorn:${u.sf.emoji.handicorn}>`, value: 1 },
  'Sloth': { emoji: `<:sloth:305037088200327168>`, value: 2 } // this is global so it don't need to be in snowflakes
};
/**
 * function hbsChooseRandom
 * @return {string} a random choice for hbs
 */
function hbsChooseRandom() {
  return u.rand(Object.keys(hbsValues));
}
let storedChooser = '';
let storedChoice = '';
/**
 * function hbsInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun hbs interaction
 */
async function slashFunHBS(int) {
  const tosend = hbs(int.options.getString(`mode`) || `vsicarus`, int.options.getString(`choice`) || `Handicorn`, `<@${int.user}>`);
  int.deleteReply();
  int.channel.send(tosend);
}
/**
 * function hbs
 * @param {string} mode whether vs icarus or another user/stored choice
 * @param {string} choice a `Handicorn`, `Buttermelon`, or `Sloth` choice
 * @param {string} chooser string to refer to a user by, whether a ping or not.
 * @return {string} a response, including a header, what happened, and if applicable who won.
 */
function hbs(mode, choice, chooser) {
  switch (mode) {
    case (`user`):
      if (!storedChoice) {
        storedChooser = chooser;
        storedChoice = choice;
        return `**Handicorn, Buttermelon, Sloth, Fight!**\n` +
        `I have stored a choice by ${chooser}, awaiting a challenge.`;
=======
const Augur = require("augurbot-ts"),
  Discord = require("discord.js"),
  u = require("../utils/utils"),
  axios = require('axios'),
  jimp = require('jimp'),
  profanityFilter = require("profanity-matcher"),
  buttermelonFacts = require('../data/buttermelonFacts.json').facts,  
  emojiKitchenSpecialCodes = require("../data/emojiKitchenSpecialCodes.json"),
  emojiSanitizeHelp = require('node-emoji'),
  mineSweeperEmojis = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '💣'];
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunColor(int) {
  let colorCode = int.options.getString("color");
  // generate random hex color
  colorCode = colorCode || "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  // In the case that we have a string in 0xABCDEF format
  let colorCSS = colorCode.replace('0x', "#");
  try {
    if (!["#000000", "black", "#000000FF"].includes(colorCSS)) colorCSS = jimp.cssColorToHex(colorCSS).toString();
    // make sure it is a valid color, and not just defaulting to black
    if (colorCSS == "255") {
      return int.editReply(`sorry, I couldn't understand the color ${colorCode}`);
    }
    const img = new jimp(256, 256, colorCSS);
    return int.editReply({ files: [await img.getBufferAsync(jimp.MIME_PNG)] });
  } catch (error) {
    return int.editReply(`sorry, I couldn't understand the color ${colorCode}`);
  }
}
const hbsValues = {
  'Buttermelon': { emoji: `<:buttermelon:${u.sf.emoji.buttermelon}>`, beats: "Handicorn", looses: "Sloth" },
  'Handicorn': { emoji: `<:handicorn:${u.sf.emoji.handicorn}>`, beats: "Sloth", looses: "Buttermelon" },
  'Sloth': { emoji: "<:sloth:305037088200327168>", beats: "Buttermelon", looses: "Handicorn" } // this is global so it don't need to be in snowflakes
};
let storedChooser = '';
let storedChoice = '';
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunHBS(int) {
  const mode = int.options.getString("mode");
  const choice = int.options.getString("choice", true);
  const chooser = int.user.toString();
  switch (mode) {
    case ("user"):
      if (!storedChoice) {
        int.deleteReply();
        storedChooser = chooser;
        storedChoice = choice;
        if (!int.channel) {
          u.wait(5000).then(() => {int.deleteReply();});
          return int.editReply(`I can't securely store this without everyone being able to see what it is in here. Try in #<${u.sf.channels.botspam}.`);
        }
        return int.channel?.send("**Handicorn, Buttermelon, Sloth, Fight!**\n" +
        `I have stored a choice by ${chooser}, awaiting a challenge.`);
>>>>>>> Stashed changes
      } else {
        const oldstoredChooser = storedChooser;
        const olcstoredChoice = storedChoice;
        storedChooser = '';
        storedChoice = '';
<<<<<<< Updated upstream
        return `**Handicorn, Buttermelon, Sloth, Fight!**\n` +
        chooser + ` challenged ${oldstoredChooser}!\n` +
        hbsResult(chooser, choice, oldstoredChooser, olcstoredChoice);
      }
    default:
    case (`icarus`): {
      const aiChoice = hbsChooseRandom();
      return `**Handicorn, Buttermelon, Sloth, Fight!**\n` +
      chooser + ` challenged Icarus!\n` +
      hbsResult(chooser, choice, `Icarus`, aiChoice);
=======
        return int.editReply("**Handicorn, Buttermelon, Sloth, Fight!**\n" +
        `${chooser} challenged ${oldstoredChooser}!\n` +
        hbsResult(chooser, choice, oldstoredChooser, olcstoredChoice));
      }
    default:
    case ("icarus"): {
      const aiChoice = u.rand(Object.keys(hbsValues));
      return int.editReply("**Handicorn, Buttermelon, Sloth, Fight!**\n" +
      chooser + " challenged Icarus!\n" +
      hbsResult(chooser, choice, "Icarus", aiChoice));
>>>>>>> Stashed changes
    }
  }
  /**
 * function hbsResult
 * @param {string} chooser1 a string to represent who made choice 1
<<<<<<< Updated upstream
 * @param {string} choice1 a `Handicorn`, `Buttermelon`, or `Sloth` choice
 * @param {string} chooser2 a string to represent who made choice 2
 * @param {string} choice2 a `Handicorn`, `Buttermelon`, or `Sloth` choice
 * @return {string} a summarry including who picked what and who won.
 */
  function hbsResult(chooser1, choice1, chooser2, choice2) {
    let response = `${chooser1} picked ${hbsValues[choice1].emoji}, ${chooser2} picked ${hbsValues[choice2].emoji}.\n`;
    const diff = hbsValues[choice2].value - hbsValues[choice1].value;
    if (diff == 0) {
      response += `It's a tie!`;// TIE
    } else if ((diff == -1) || (diff == 2)) {
      response += `${chooser2} wins!`;
    } else {
      response += `${chooser1} wins!`;
=======
 * @param {string} choice1 chooser1's "Handicorn", "Buttermelon", or "Sloth" choice
 * @param {string} chooser2 ...
 * @param {string} choice2 ...
 * @return {string} a summary including who picked what and who won.
 */
  function hbsResult(chooser1, choice1, chooser2, choice2) {
    let response = `${chooser1} picked ${hbsValues[choice1].emoji}, ${chooser2} picked ${hbsValues[choice2].emoji}.\n`;
    if (choice1 == choice2) {
      response += "It's a tie!";
    } else if (hbsValues[choice1].beats == choice2) {
      response += `${chooser1} wins!`;
    } else {
      response += `${chooser2} wins!`;
>>>>>>> Stashed changes
    }
    return response;
  }
}
<<<<<<< Updated upstream

/**
 * function allthe
 * @param {Discord.ChatInputCommandInteraction} int a /fun allthe interaction
 */
async function slashFunAllThe(int) {
  const thing = int.options.getString('thing');
  int.editReply({ content:`${int.user.username}:\nALL THE ${thing.toUpperCase()}!`, files: [{ attachment:`https://cdn.discordapp.com/emojis/250348426817044482.png`, name:`allthe.png` }] });
}
/**
 * function acronymInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun acronym interaction
 */
async function slashFunAcronym(int) {
  return int.editReply(`I've always wondered what __**${acronym(int.options.getInteger(`length`))}**__ stood for...`);
}
/**
 * function acronym
 * @param {number|null} len length of acronym
 * @returns {string} a randomly generated, clean, acronym
 */
function acronym(len) {
  const alphabet = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `Y`, `Z`];
  if (!len) {len = Math.floor(Math.random() * 3) + 3;}
  const profanityFilter = require(`profanity-matcher`);
=======
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunAcronym(int) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const len = int.options.getInteger("length") || Math.floor(Math.random() * 3) + 3;
>>>>>>> Stashed changes
  const pf = new profanityFilter();
  let wordgen = [];

  for (let ignored = 0; ignored < len * len; ignored++) {// try a bunch of times
    for (let i = 0; i < len; i++) {
      wordgen.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
<<<<<<< Updated upstream
    const word = wordgen.join(``);

    if (pf.scan(word.toLowerCase()).length == 0) {
      return word;
=======
    const word = wordgen.join("");

    if (pf.scan(word.toLowerCase()).length == 0) {
      return int.editReply(`I've always wondered what __**${word}**__ stood for...`);
>>>>>>> Stashed changes
    } else {
      wordgen = [];
    }
  }
<<<<<<< Updated upstream
  return `err`;
}

/**
 * function minesweeperInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun minesweeper interaction
 */
async function slashFunMinesweeper(int) {
  let size, mineCount;
  switch (int.options.getString(`difficulty`)) {
    case `Hard`:
      size = 14;
      mineCount = 60;
      break;
    case `Medium`:
      size = 10;
      mineCount = 30;
      break;
    default:
    case `Easy`:
      size = 5;
      mineCount = 5;
      break;
  }
  const field = minesweeper(size, mineCount);
  let degradingField = field;
  function countEmoji(text) {
    const emojiRegex = new RegExp(`(${Object.values(mineSweeperEmojis).map(emoji => emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join(`|`)})`, 'g');
    const emoji = text.match(emojiRegex);
    return emoji?.length || 0;
  }
  if (countEmoji(field) <= 99) {
    return int.editReply(field); // No splitting needed
  }
  while (countEmoji(degradingField) > 99) {
    let segment = ``;
    while (countEmoji(segment + degradingField.substring(0, degradingField.indexOf(`\n`) >= 0 ? degradingField.indexOf(`\n`) : degradingField.length)) <= 99) {
      segment += degradingField.substring(0, (degradingField.indexOf(`\n`) >= 0 ? degradingField.indexOf(`\n`) : degradingField.length) + 1);
      degradingField = degradingField.substring((degradingField.indexOf(`\n`) >= 0 ? degradingField.indexOf(`\n`) : degradingField.length) + 1);
    }
    if (segment + degradingField == field) {
      await int.editReply(segment);
    } else {
      await int.channel.send(segment);
    }
  }
  return int.channel.send(degradingField);
}

/**
 * function minesweeper
 * @param {number} size edge length of the minesweeper game to generate
 * @param {number} mineCount the number of mines to put in the game
 * @return {string} a textual minesweeper game with a header and using || spoilers.
 */
function minesweeper(size, mineCount) {
  // Getting all possible board spaces
  const possibleSpaces = Array.from({ length: size * size }, (v, k) => k);
  // Remove 4 corners, corners can't be mines
  possibleSpaces.splice((size * size) - 1, 1);
  possibleSpaces.splice((size - 1) * size, 1);
  possibleSpaces.splice(size - 1, 1);
  possibleSpaces.splice(0, 1);
  // Finding out where the mines will be
  const mineSpaces = [];
  for (let i = 0; i < mineCount; i++) {
    const random = Math.floor(Math.random() * possibleSpaces.length);
    mineSpaces.push(possibleSpaces[random]);
    possibleSpaces.splice(random, 1);
  }

  function getMineCount(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      if ((x + i) < 0 || (x + i) >= size) continue;
      for (let j = -1; j <= 1; j++) {
        if ((y + j) < 0 || (y + j) >= size) continue;
        if (mineSpaces.includes((y + j) * size + x + i)) count++;
      }
    }

    return count;
  }

  // Creating the final board
  /** @type {number[][]} */
  const board = [];
  for (let x = 0; x < size; x++) {
    board.push([]);
    for (let y = 0; y < size; y++) {
      if (mineSpaces.includes(x + (y * size))) {
        board[x].push(9);
        continue;
      }
      board[x].push(getMineCount(x, y));
    }
  }
  const output = board.map(row => row.map(num => `||${num == 9 ? mineSweeperEmojis[`bomb`] : mineSweeperEmojis[num]}||`).join(``)).join(`\n`);
  return (`**Mines: ${mineCount}** (Tip: Corners are never mines)\n${output}`);
}


/**
 * function rollOldInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun rollOld interaction
 */
async function slashFunRollOld(int) {
  const rollsolts = rollOld(int.options.getString('rollformula'));
  return int.editReply(rollsolts.useroutput);
}
/**
 * function rollOld
 * @param string rolls roll formula in old !roll format
 * @returns {{ total:number, rolls:string[], useroutput:string }} Object with 3 key/value pairs. total, an int with the total of all of the rolls; rolls, an int[] with the result of each roll; and useroutput, output or error in human readable format
 */
function rollOld(rollFormula) {
  if (!rollFormula) rollFormula = `1d6`;
  rollFormula = rollFormula.toLowerCase().replace(/-/g, `+-`).replace(/ /g, ``);
  const diceExp = /(\d+)?d\d+(\+-?(\d+)?d?\d+)*/;
  const roughDice = diceExp.exec(rollFormula);
  const fateExp = /(\d+)?df(\+-?\d+)?/i;
  const fate = fateExp.exec(rollFormula);
  if (roughDice) {
    const exp = roughDice[0].replace(/\+-/g, `-`);
    const dice = roughDice[0].split(`+`);

    const doneRolls = [];
    let total = 0;

    dice.forEach((formula, rollCount) => {
      doneRolls[rollCount] = [];
      if (formula.includes(`d`)) {
        const add = (formula.startsWith(`-`) ? -1 : 1);
        if (add == -1) formula = formula.substr(1);
        if (formula.startsWith(`d`)) formula = `1${formula}`;
        const formulaParts = formula.split(`d`);
        const num = parseInt(formulaParts[0], 10);
        if (num && num <= 10000) {
          for (let i = 0; i < num; i++) {
            const val = Math.ceil(Math.random() * parseInt(formulaParts[1], 10)) * add;
            doneRolls[rollCount].push((i == 0 ? `**${formula}:** ` : ``) + val);
            total += val;
          }
        } else {
          return { total:0, rolls:0, useroutput:`I'm not going to roll *that* many dice... 🙄` };
        }
      } else {
        total += parseInt(formula, 10);
        rollCount[rollCount].push(`**${formula}**`);
      }
    });
    if (doneRolls.length > 0) {
      const response = `You rolled ${exp} and got:${total}\n` +
          ((doneRolls.reduce((a, c) => a + c.length, 0) > 20) ? `` : ` ( ${doneRolls.reduce((a, c) => a + c.join(`, `) + `; `, ``)})`);
      return { total:total, rolls:doneRolls, useroutput:response };
    } else {
      return { total:0, rolls:[], useroutput:`you didn't give me anything to roll.` };
    }
  } else if (fate) {
    const exp = fate[0].replace(/\+-/g, `-`);
    const dice = fate[0].split(`+`);

    const rolls = [];
    dice.forEach(d => {
      if (d.includes(`df`)) {
        const add = (d.startsWith(`-`) ? -1 : 1);
        if (add == -1) d = d.substr(1);
        if (d.startsWith(`df`)) d = `1${d}`;
        const num = parseInt(d, 10);
        if (num && num <= 10000) {
          for (let i = 0; i < num; i++) {
            rolls.push((Math.floor(Math.random() * 3) - 1) * add);
          }
        } else {
          return { total:0, rolls:[], useroutput:`I'm not going to roll *that* many dice... 🙄` };
        }
      } else {
        rolls.push(parseInt(d, 10));
      }
    });
    if (rolls.length > 0) {
      const response = `You rolled ${exp} and got:${rolls.reduce((c, d) => c + d, 0)}\n` +
          ((rolls.length > 20) ? `` : ` (${rolls.join(`, `)})`);
      return { total:rolls.reduce((c, d) => c + d, 0), rolls:rolls, useroutput:response };
    } else {
      return { total:0, rolls:[], useroutput:`you didn't give me anything to roll.` };
    }
  } else {
    return { total:0, rolls:[], useroutput:`that wasn't a valid dice expression.` };
  }
}
/**
 * function rollFInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun rollF interaction
 */
async function slashFunRollF(int) {
  const rollsolts = rollf(int.options.getInteger('dice'), int.options.getInteger('modifier'));
  return int.editReply(rollsolts.useroutput);
}
/**
 * function rollf
 * @param int dice number of dice to roll (defaults to 1)
 * @param int modifier modifier to add to roll result (defaults to 0)
 * @returns {{ total:number, rolls:number[], useroutput:string }} Object with 3 key/value pairs. total, an int with the total of all of the rolls; rolls, an int[] with the result of each roll; and useroutput, output or error in human readable format
 */
function rollf(dice, modifier) {
  if (!dice) dice = 1;
  if (!modifier) modifier = 0;
  const rolls = [];
  const num = dice;
  if (num && num <= 10000) {
    for (let i = 0; i < num; i++) {
      rolls.push((Math.floor(Math.random() * 3) - 1));
    }
  } else {
    return { total:0, rolls:[], useroutput:`I'm not going to roll *that* many dice... 🙄` };
  }
  if (rolls.length > 0) {
    const response = `You rolled ${dice}df and got:${rolls.reduce((c, d) => c + d, 0)}\n` +
    ((rolls.length > 20) ? `` : ` (${rolls.join(`, `)})`);
    return { total:rolls.reduce((c, d) => c + d, 0), rolls:rolls, useroutput:response };
  } else {
    return { total:0, rolls:[], useroutput:`you didn't give me anything to roll.` };
  }
}
/**
 * function rollInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun roll interaction
 */
async function slashFunRoll(int) {
  const rollsolts = rollDice(int.options.getInteger('dice'), int.options.getInteger('sides'), int.options.getInteger('modifier'));
  return int.editReply(rollsolts.useroutput);
}
/**
 * function rollDice
 * @param int dice number of dice to roll (defaults to 1)
 * @param int sides side count of dice (defaults to 6)
 * @param int modifier modifier to add to roll result (defaults to 0)
 * @returns {{ total:number, rolls:string[][], useroutput:string }} Object with 3 key/value pairs. total, an int with the total of all of the rolls; rolls, an int[] with the result of each roll; and useroutput, output or error in human readable format
 */
function rollDice(dice, sides, modifier) {
  if (!dice) dice = 1;
  if (!sides) sides = 6;
  if (!modifier) modifier = 0;
  /** @type {string[][]} */
  const rolls = [];
  let total = 0;
  rolls[sides] = [];
  const num = dice;
  if (num && num <= 10000) {
    for (let i = 0; i < num; i++) {
      const val = Math.ceil(Math.random() * parseInt(sides, 10));
      rolls[sides].push((i == 0 ? `**d${sides}:** ` : ``) + val);
      total += val;
    }
  } else {
    return { total:0, rolls:[], useroutput:`I'm not going to roll *that* many dice... 🙄` };
  }
  if (modifier) {
    total += parseInt(dice, 10);
    rolls[sides].push(`**${dice}**`);
  }
  if (rolls.length > 0) {
    const response = `You rolled ${dice}d${sides} and got:${total}\n` +
        ((rolls.reduce((a, c) => a + c.length, 0) > 20) ? `` : ` ( ${rolls.reduce((a, c) => a + c.join(`, `) + `; `, ``)})`);
    return { total:total, rolls:rolls, useroutput:response };
  } else {
    return { total:0, rolls:[], useroutput:`you didn't give me anything to roll.` };
  }
}
/**
 * function ball8
 * @param {Discord.ChatInputCommandInteraction} int a /fun 8ball interaction
 */
async function slashFun8ball(int) {
  const question = int.options.getString(`question`);
  if (!question || !question.endsWith(`?`)) {
    return int.editReply(`you need to ask me a question, silly.`);
  } else {
    const outcomes = [
      `It is certain.`,
      `It is decidedly so.`,
      `Without a doubt.`,
      `Yes - definitely.`,
      `You may rely on it.`,
      `As I see it, yes.`,
      `Most likely.`,
      `Outlook good.`,
      `Yes.`,
      `Signs point to yes.`,
      `Reply hazy, try again.`,
      `Ask again later.`,
      `Better not tell you now.`,
      `Cannot predict now.`,
      `Concentrate and ask again.`,
      `Don't count on it.`,
      `My reply is no.`,
      `My sources say no.`,
      `Outlook not so good.`,
      `Very doubtful.`
    ];
    return int.editReply(`You asked :"${question}"\n` +
      `The 8ball replies:\n` +
      u.rand(outcomes));
  }
}
/**
 * function repost
 * @param {Discord.ChatInputCommandInteraction} int a /fun repost interaction
 */
async function slashFunRepost(int) {
  if (!int.channel) {
    return int.editReply(`I don't know where here is, so I can't find anything to repost... try in a more normal channel.`);
  }
  const messages = (await int.channel.messages.fetch({ limit: 100 }));
  const filtered = messages.filter(m => m.attachments.size > 0);
  const latest = filtered.last();
  if (!latest) {
    return int.editReply(`I couldn't find anything in the last 100 messages to repost.`);
  }
  const latestsAttatchments = latest.attachments;
  if (!latestsAttatchments) {
    u.errorLog.send({ embeds: [ u.embed().setDescription(`impossible /repost error #1`)] });
    return int.editReply(`I'm going crazy, this error should be impossible.`);
  }
  const latestsFirstAttatchment = latestsAttatchments.first();
  if (!latestsFirstAttatchment) {
    u.errorLog.send({ embeds: [ u.embed().setDescription(`impossible /repost error #2`)] });
    return int.editReply(`I'm going crazy, this error should be impossible.`);
  }
  const imgToRepost = latestsFirstAttatchment.url;
  return int.editReply(imgToRepost);
}
/**
 * function buttermelon
 * @param {Discord.ChatInputCommandInteraction} int a /fun buttermelon interaction
 */
async function slashFunButtermelon(int) {
  const buttermelonFacts = require('../data/buttermelonFacts.json');
  return int.editReply(`🍌 ${u.rand(buttermelonFacts.facts)}`);
}
/**
 * function buttermelonEdit
 * @param {Discord.Message} msg a message potentially containing bannana(s)
 */
function buttermelonEdit(msg) {
  if ((msg.channel.id == u.sf.channels.botspam || msg.channel.id == u.sf.channels.bottesting) && (msg.cleanContent.toLowerCase() == `test`)) {
    msg.channel.send((Math.random() < 0.8 ? `pass` : `fail`));
  }
  const exclude = ['121033996439257092', '164784857296273408'];// IDK where these are so hardcoded they shall currently remain.
  const roll = Math.random();
  if (roll < 0.3 && !msg.author.bot && !exclude.includes(msg.channel.id)) {
    // let banana = /[bß8ƥɓϐβбБВЬЪвᴮᴯḃḅḇÞ][a@∆æàáâãäåāăȁȃȧɑαдӑӓᴀᴬᵃᵅᶏᶐḁạảấầẩẫậắằẳẵặ4Λ]+([nⁿńňŋƞǹñϰпНhийӣӥѝνṅṇṉṋ]+[a@∆æàáâãäåāăȁȃȧɑαдӑӓᴀᴬᵃᵅᶏᶐḁạảấầẩẫậắằẳẵặ4Λ]+){2}/ig;
    if (msg.content.toLowerCase().includes(`bananas`)) {
      if (roll < 0.1) {
        msg.channel.send({ files: [new Discord.AttachmentBuilder('media/buttermelonsMan.jpeg')] }).catch(u.errorHandler);
      } else {
        msg.channel.send(`*buttermelons`).catch(u.errorHandler);
      }
    } else if (msg.content.toLowerCase().includes(`banana`)) {
      if (roll < 0.06) {
        msg.channel.send({ files: [new Discord.AttachmentBuilder('media/buttermelonPile.png')] }).catch(u.errorHandler);
      } else if (roll < 0.1) {
        msg.channel.send({ files: [new Discord.AttachmentBuilder('media/buttermelonMan.jpeg')] }).catch(u.errorHandler);
      } else {
        msg.channel.send(`*buttermelon`).catch(u.errorHandler);
=======
  return int.editReply("I've always wondered what __**IDUTR**__ stood for...");// cannonically it hearby stands for "IDiUT eRror"
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunMinesweeper(int) {
  let edgesize, mineCount, preclickCount;
  switch (int.options.getString("difficulty", true)) {
    case "Hard":
      edgesize = [10, 18];
      mineCount = 60;
      preclickCount = 6;
      break;
    case "Medium":
      edgesize = [10, 10];
      mineCount = 30;
      preclickCount = 4;
      break;
    default:
      edgesize = [5, 5];
      mineCount = 5;
      preclickCount = 4;
      break;
  }
  // override with manual numbers if given
  edgesize[0] = int.options.getInteger("width") || edgesize[0];
  edgesize[1] = int.options.getInteger("height") || edgesize[1];
  mineCount = int.options.getInteger("minecount") || mineCount;
  preclickCount = int.options.getInteger("preclickcount") || preclickCount;
  // x and y lengths (for mobile users)
  const [width, height] = edgesize;
  preclickCount = Math.min(width * height, preclickCount);
  mineCount = Math.min(width * height - preclickCount, mineCount);
  // Create a 2d array for the board
  const board = new Array(height).fill([]).map(() => {return new Array(width).fill(0);});
  // Convert the 2d array to a 2d index array. Filter corner spots.
  // const rows = board.map((c, y) => y);
  const spaces = board.map((r, y) => {
    const row = new Array(width + 1);
    row[0] = y;
    r.forEach((space, x) => {row[x + 1] = x;});
    return row;
  });
  // console.log(mineCount);
  // console.log(preclickCount);
  // console.log(board);
  // console.log(spaces);
  for (let i = 0; i < mineCount; i++) {
    // console.log("mine");
    // console.log(spaces);
    // Get a random position
    const rownum = Math.floor(Math.random() * spaces.length);
    const row = spaces[rownum];
    const y = row[0];
    const slotnum = Math.floor(Math.random() * (row.length - 1)) + 1;
    const x = row[slotnum];
    // Set the value to a mine
    board[y][x] = 9;
    // Remove from possible mine spaces
    row.splice(slotnum, 1);
    if (row.length == 1) {
      spaces.splice(rownum, 1);
    }
    // Increment all spots around it
    for (let incrementx = Math.max(0, x - 1); incrementx < Math.min(width, x + 2); incrementx++) {
      for (let incrementy = Math.max(0, y - 1); incrementy < Math.min(height, y + 2); incrementy++) {
        // if (incrementx >= width || incrementx < 0 || incrementy >= height || incrementy < 0) continue;
        board[incrementy][incrementx]++;
      }
    }
  }
  // console.log(mineCount);
  // console.log(preclickCount);
  // console.log(board);
  // console.log(spaces);
  for (let i = 0; i < preclickCount; i++) {
    // console.log("click");
    // console.log(spaces);
    // Get a random position
    const rownum = Math.floor(Math.random() * spaces.length);
    const row = spaces[rownum];
    const y = row[0];
    const slotnum = Math.floor(Math.random() * (row.length - 1)) + 1;
    const x = row[slotnum];
    // expose it
    board[y][x] = -1 - board[y][x];
    // Remove from non-special-spaces
    row.splice(slotnum, 1);
    if (row.length == 1) {
      spaces.splice(rownum, 1);
    }
  }
  // console.log(mineCount);
  // console.log(preclickCount);
  // console.log(board);
  // console.log(spaces);
  // seperate into rows and emojify and hide if not exposed
  const rowStrings = board.map(row => row.map(num => num < 0 ? mineSweeperEmojis[-num - 1] : `||${mineSweeperEmojis[Math.min(num, 9)]}||`).join(""));
  if (!int.channel) {
    return int.editReply(`I can't figure out where to put the board in here, try again in another channel like <#${u.sf.channels.botspam}>`);
  }
  int.editReply(`**Mines: ${mineCount}**`);
  const messages = [""];
  let messageCount = 0;
  let tagpairs = 0;
  rowStrings.forEach((row) => {
    if (tagpairs + (width * 2) > 199) {
      tagpairs = 0;
      messageCount++;
      messages[messageCount] = "";
    }
    tagpairs += width * 2;
    messages[messageCount] += row + "\n";
  });
  let ret;
  messages.forEach((content) => {
    ret = int.channel?.send(content);
  });
  return ret;
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunRoll(int) {
  const dice = int.options.getInteger('dice') || 1;
  const sides = int.options.getInteger('sides') || 6;
  const modifier = int.options.getInteger('modifier') || 0;
  /** @type {string[]} */
  const rolls = [];
  let total = modifier;
  if (dice > 10000) {
    return int.editReply("I'm not going to roll *that* many dice... 🙄");
  }
  for (let i = 0; i < dice; i++) {
    const val = Math.ceil(Math.random() * sides);
    rolls.push((i == 0 ? `**d${sides}:** ` : "") + val);
    total += val;
  }
  return int.editReply(`You rolled ${dice}d${sides}${modifier ? `+${modifier}` : ""} and got:\n` +
    total + (rolls.length <= 20 ? ` ( ${rolls.join(", ")}${modifier ? `; **${modifier}**` : ""} )` : ""));
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFun8ball(int) {
  const question = int.options.getString("question", true);
  if (!question.endsWith("?")) {
    return int.editReply("you need to ask me a question, silly.");
  } else {
    const outcomes = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      // "Reply hazy, try again.",
      // "Ask again later.",
      // "Better not tell you now.",
      // "Cannot predict now.",
      // "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ];
    return int.editReply(`You asked :"${question}"\n` +
      "The 8ball replies:\n" +
      u.rand(outcomes));
  }
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunRepost(int) {
  if (!int.channel) {
    return int.editReply("I don't know where here is, so I can't find anything to repost... try in a more normal channel.");
  }
  const latest = (await int.channel.messages.fetch({ limit: 100 })).filter(m => m.attachments.size > 0 || m.embeds.some(embed => embed.image || embed.video)).first();
  if (!latest) {
    return int.editReply("I couldn't find anything in the last 100 messages to repost.");
  }
  // const imgToRepost = latest.attachments;
  return int.editReply({
    content: 'You have been charged with reposting this:',
    files: latest.attachments.map(a => a.url),
    embeds: latest.embeds.filter(embed => embed.image || embed.video)
  });
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunButtermelon(int) {
  return int.editReply(`🍌 ${u.rand(buttermelonFacts)}`);
}
<<<<<<< Updated upstream
=======

/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunQuote(int) {
  const url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  await int.deferReply();
  const response = await axios({ url, method: "get" }).catch((/** @type {axios.AxiosError} */ e) => {
    throw new Error(`axios error: ${e.status}\n${e.message}`);
  });
  const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  const embed = u.embed();
  if (data) {
    embed.setAuthor({ name: data.quoteAuthor })
      .setDescription(data.quoteText)
      .setTimestamp(null);
  } else {
    embed.setAuthor({ name: "ChainSword20000" })
      .setDescription("A developer uses dark mode because bugs are attracted to light, but wouldn't that put the bugs in the code instead of the background?");
  }
  return int.editReply({ embeds: [embed] });
}

/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunNamegame(int) {
  // fun shenanigans (basically check if member is partial (which it probably isnt 99% of the time))
  const user = int.member && "displayName" in int.member ? int.member.displayName : int.user.displayName;
  let name = (int.options.getString("name") || user)
    .replace(/[^a-zA-Z]/g, '_')// just ABCabc etc, numbers were causing problems.
    .split("_")[0];// and just one segment
  name = name.charAt(0).toUpperCase() + name.slice(1);
  try {
    const url = `https://thenamegame-generator.com/lyrics/${name}.html`;
    await int.deferReply();
    // @ts-ignore
    const response = await axios({ url, method: "get" }).catch(u.noop);
    if (!response) {
      return int.editReply(`I couldn't generate lyrics for ${name}.\nPerhaps you can get it yourself from https://thenamegame-generator.com.`).then(u.clean);
    }
    // parse the song
    const song = /<blockquote>\n(.*)<\/blockquote>/g.exec(response?.data)?.[1]?.replace(/<br ?\/>/g, "\n");
    // make sure its safe
    const pf = new profanityFilter();
    const profane = pf.scan(song?.toLowerCase().replace("\n", " ")).length;
    if (!song) {
      return int.editReply("I uh... broke my voice box. Try a different name?").then(u.clean);
    } else if (profane > 0) {
      return int.editReply("Let's try a different one...").then(u.clean);
    }
    const embed = u.embed().setTitle(`🎶 The Name Game! ${name}! 🎵`).setDescription(song);
    return int.editReply({ embeds: [embed] });
  } catch (error) { u.errorHandler(error, int); }
}

/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunChoose(int) {
  const optionsArg = int.options.getString("options", true);
  if (optionsArg && optionsArg.includes("|")) {
    const options = optionsArg.split("|");
    const prefixes = ["I choose", "I pick", "I decided"];
    return int.reply(`${u.rand(prefixes)} **${u.rand(options).trim()}**`);
  }
  return int.reply({ content: 'you need to give me two or more choices! `a | b`', ephemeral: true });

}
/**
 * @param {string} emoji unsanitized/irregular emoji input
 */
function emojiSanitize(emoji) {
  let ucode = emojiSanitizeHelp.find(emoji)?.emoji ?? emoji;
  ucode = emojiKitchenSpecialCodes[ucode] ?? ucode;
  return ucode;
}
function emojiCodePointify(emoji) {
  return (emojiSanitizeHelp.find(emoji)?.emoji ?? emoji)
    .split('')
    .map((char) => char.codePointAt(0).toString(16)).join("-");
}

/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunEmoji(int) {
  try {
    await int.deferReply();
    const emoji1input = int.options.getString("emoji1", true).trim();
    const emoji2input = (int.options.getString("emoji2") || "").trim();
    const emoji1 = emojiSanitize(emoji1input);
    if (emoji2input.length <= 0) {
      // embiggen
      console.log(emoji1input);
      if (emoji1input.includes("<:") || emoji1input.includes("<a:")) {
        const idExtractRegx = /<(a?):(\w+):(\d+)>/i;
        // eslint-disable-next-line no-unused-vars
        const [_, gif, name, id] = idExtractRegx.exec(emoji1input) || [false, "error", 244108501188739072];
        console.log(gif+":"+name+":"+id);
        if ((await axios(`https://cdn.discordapp.com/emojis/${id}.${gif.length >= 1 ? 'gif' : 'png'}`)).status !== 200) {
          return int.editReply(`For some reason I couldn't enlarge ${emoji1input}.`).then(u.clean);
        }
        return int.editReply({ files: [{ attachment: `https://cdn.discordapp.com/emojis/${id}.${gif.length >= 1 ? 'gif' : 'png'}`, name: name + "Fullres." + (gif.length >= 1 ? 'gif' : 'png') }] });
      }
      const e1CP = emojiCodePointify(emoji1);
      console.log(e1CP);
      try {
        if ((await axios(`https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${e1CP}.svg`)).status !== 200) {
          throw new AxiosError;
        }
        return int.editReply({
          content: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${e1CP}.svg`,
          files: [{
            attachment: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/${e1CP}.png`,
            name: emojiSanitizeHelp.find(emoji1)?.key + "Fullres.png"
          }]
        });
      } catch {
        const e1CPR = e1CP.replace(/-fe0f/g, '');
        try {
          if ((await axios(`https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${e1CPR}.svg`)).status !== 200) {
            throw new AxiosError;
          }
          return int.editReply({
            content: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${e1CPR}.svg`,
            files: [{
              attachment: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/${e1CPR}.png`,
              name: emojiSanitizeHelp.find(emoji1)?.key + "Fullres.png"
            }]
          });
        } catch {
          return int.editReply(`For some reason I couldn't enlarge ${emoji1input}.`).then(u.clean);
        }
      }
    }
    // attempt to merge
    const emoji2 = emojiSanitize(emoji2input);
    const results = await axios(`https://tenor.googleapis.com/v2/featured?key=${config.api.tenor}&client_key=emoji_kitchen_funbox&q=${emoji1}_${emoji2}&collection=emoji_kitchen_v6&contentfilter=high`).catch(u.noop);
    const url = results?.data?.results[0]?.url;
    if (url) {
      return int.editReply({ files: [{ attachment: url, name: "combined.png" }] });
    }
    if ((emoji1input + emoji2input).includes("<:")) return int.editReply("I can't combine custom emojis! Try again with some default ones.").then(u.clean);
    return int.editReply(`For some reason I couldn't combine ${emoji1} and ${emoji2}.`).then(u.clean);
  } catch (error) {
    u.errorHandler(error);
  }
}

>>>>>>> Stashed changes
/** @param {Discord.Message|Discord.PartialMessage} msg */
function buttermelonEdit(msg) {
  if ((msg.channel.id == u.sf.channels.botspam || msg.channel.id == u.sf.channels.bottesting) && (msg.cleanContent?.toLowerCase() == "test")) {
    msg.reply((Math.random() < 0.8 ? "pass" : "fail"));
  }
  const exclude = [u.sf.channels.minecraftcategory];
  const roll = Math.random();
  if (roll < 0.3 && !msg.author?.bot && !exclude.includes(msg.channel.id)) {
    // let banana = /[bß8ƥɓϐβбБВЬЪвᴮᴯḃḅḇÞ][a@∆æàáâãäåāăȁȃȧɑαдӑӓᴀᴬᵃᵅᶏᶐḁạảấầẩẫậắằẳẵặ4Λ]+([nⁿńňŋƞǹñϰпНhийӣӥѝνṅṇṉṋ]+[a@∆æàáâãäåāăȁȃȧɑαдӑӓᴀᴬᵃᵅᶏᶐḁạảấầẩẫậắằẳẵặ4Λ]+){2}/ig;
    if (msg.content?.toLowerCase().includes("bananas")) {
      if (roll < 0.1) {
        msg.reply({ files: ['media/buttermelonsMan.jpeg'] }).catch(u.errorHandler);
      } else {
        msg.reply("*buttermelons").catch(u.errorHandler);
      }
    } else if (msg.content?.toLowerCase().includes("banana")) {
      if (roll < 0.06) {
        msg.reply({ files: ['media/buttermelonPile.png'] }).catch(u.errorHandler);
      } else if (roll < 0.1) {
        msg.reply({ files: ['media/buttermelonMan.jpeg'] }).catch(u.errorHandler);
      } else {
        msg.reply("*buttermelon").catch(u.errorHandler);
>>>>>>> Stashed changes
      }
    }
  }
}
<<<<<<< Updated upstream
/**
 * function quoteInt
 * @param {Discord.ChatInputCommandInteraction} int a /fun quote interaction
 */
async function slashFunQuote(int) {
  return int.editReply(await quote());
}
/**
 * function quote
 * @returns {Promise<string>} a random quote with a bit of reformatting.
 */
async function quote() {
  const url = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const response = await axios({ url, method: `get` }).catch((/** @type {axios.AxiosError} */ e) => {
    throw new Error(`quote command error:${e.status}`);
  });
  console.log(response);
  const data = response.data;
  console.log(data);
  if (data) {
    const randomQuote = data;
    console.log(`> ${randomQuote.quoteText}\n> - ${randomQuote.quoteAuthor}`);
    return `> ${randomQuote.quoteText}\n> - ${randomQuote.quoteAuthor}`;
  } else {
    return `> A developer uses dark mode because bugs are attracted to light, \n` +
    `> but wouldn't that put the bugs in the code instead of the background?\n` +
    `> - ChainSword20000`;
  }
}
/**
 * function namegame
 * @param {Discord.ChatInputCommandInteraction} int a /fun namegame interaction
 */
async function slashFunNamegame(int) {
  let nameArg = int.options.getString(`name`);
  try {
    if (!nameArg) nameArg = int.user.displayName;
    nameArg = nameArg.replace(/[^a-zA-Z]/g, '_');// just ABCabc etc, numbers were causing problems.
    nameArg = nameArg.split(`_`)[0];// and just one segment
    const name = nameArg;
    const url = `https://thenamegame-generator.com/lyrics/${name}.html`;
    const response = await axios({ url, method: `get` }).catch((/** @type {axios.AxiosError} */ e) => {
      int.editReply(`Could not generate lyrics for ${name}.\nPerhaps you can get it yourself from https://thenamegame-generator.com.`);
      throw new Error(`namegame command error:${e.status}`);
    });
    const data = response.data;
    if (data) {
      const profanityFilter = require(`profanity-matcher`);
      const pf = new profanityFilter();
      const lyricsUntrimmedEnd = data.substring(data.indexOf(`<blockquote>`) + 12);
      const lyricsTrimmedWithHtml = lyricsUntrimmedEnd.substring(0, lyricsUntrimmedEnd.indexOf(`</blockquote>`));
      const results = lyricsTrimmedWithHtml.replace(/<br>/g, `\n`).replace(/<br \/>/g, `\n`);
      const pfresults = pf.scan(results.toLowerCase().replace(/[-\n]/g, ` `).replace(/\s\s+/g, ` `));
      const ispf = (pfresults.length > 0 && pfresults[0]) || (pfresults.length > 1);
      if (!ispf && (name.length <= 230) && (results.length + name.length <= 5750)) {
        const embed = u.embed().setTitle(`🎶 **The Name Game! ${name}! 🎵`).setDescription(results);
        int.editReply({ embeds:[embed] });
      } else {
        int.editReply(`😬`);
      }
    } else {
      int.editReply(`❌`);
    }
  } catch (error) { u.errorHandler(error, int); }
}


/**
 * function chaos
 * @param {Discord.CommandInteraction} int a /fun chaos interaction
 */
function slashFunChaos(int) {
  int.editReply({ content:int.user.displayName + ` right now:`, files: [new Discord.AttachmentBuilder('media/chaos.gif')] }).catch(u.errorHandler);
}
const Module = new Augur.Module()
.addInteraction({
  name: `fun`,
=======
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunQuote(int) {
  const url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  // @ts-ignore
  const response = await axios({ url, method: "get" }).catch((/** @type {axios.AxiosError} */ e) => {
    throw new Error(`quote command error:${e.status}`);
  });
  const data = response.data;
  if (data) {
    const randomQuote = data;
    return int.editReply(`> ${randomQuote.quoteText}\n> - ${randomQuote.quoteAuthor}`);
  } else {
    return int.editReply("> A developer uses dark mode because bugs are attracted to light, \n" +
    "> but wouldn't that put the bugs in the code instead of the background?\n" +
    "> - ChainSword20000");
  }
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunNamegame(int) {
  let nameArg = int.options.getString("name");
  try {
    if (!nameArg) nameArg = int.user.displayName;
    nameArg = nameArg.replace(/[^a-zA-Z]/g, '_');// just ABCabc etc, numbers were causing problems.
    nameArg = nameArg.split("_")[0];// and just one segment
    const name = nameArg;
    const url = `https://thenamegame-generator.com/lyrics/${name}.html`;
    // @ts-ignore
    const response = await axios({ url, method: "get" }).catch(() => {
      return int.editReply(`Could not generate lyrics for ${name}.\nPerhaps you can get it yourself from https://thenamegame-generator.com.`);
    });
    const data = response.data;
    if (data) {
      const pf = new profanityFilter();
      const lyricsUntrimmedEnd = data.substring(data.indexOf("<blockquote>") + 12);
      const lyricsTrimmedWithHtml = lyricsUntrimmedEnd.substring(0, lyricsUntrimmedEnd.indexOf("</blockquote>"));
      const results = lyricsTrimmedWithHtml.replace(/<br>/g, "\n").replace(/<br \/>/g, "\n");
      const pfresults = pf.scan(results.toLowerCase().replace(/[-\n]/g, " ").replace(/\s\s+/g, " "));
      const ispf = (pfresults.length > 0 && pfresults[0]) || (pfresults.length > 1);
      if (!ispf && (name.length <= 230) && (results.length + name.length <= 5750)) {
        const embed = u.embed().setTitle(`🎶 **The Name Game! ${name}! 🎵`).setDescription(results);
        return int.editReply({ embeds:[embed] });
      } else {
        return int.editReply("Let's try a different one...");
      }
    } else {
      return int.editReply("I uh... broke my voice box. Try a different name?");
    }
  } catch (error) { u.errorHandler(error, int); }
}
/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunChoose(int) {
  const optionsArg = int.options.getString("options", true);
  if (optionsArg && optionsArg.includes("|")) {
    const options = optionsArg.split("|");
    const prefixes = ["I choose", "I pick", "I decided"];
    return int.editReply(`${u.rand(prefixes)} **${u.rand(options).trim()}**`);
  } else {
    return int.editReply('you need to give me two or more choices! "a | b"');
  }
}
/** @param {String} emoji unsanitized/irregular emoji input */
/** @returns {String} unicode code point with appended u */
function unicodeify(emoji) {
  const ucode = 'u' + emojilib.find(emoji)?.emoji.codePointAt(0)?.toString(16);
  return emojiKitchenSpecialCodes[ucode] ?? ucode;
  // return ucode;
  // let unicode;
  // if (/^[0-9A-Fa-f]+$/.test(emoji)) {
  //   unicode = emoji;
  // } else if (emoji.includes(":")) {
  //   let emojiName = emoji.substring(emoji.indexOf(":") + 1);
  //   emojiName = emojiName.substring(0, emojiName.indexOf(":"));
  //   unicode = emojiUnicode[emojiName];
  // } else {
  //   unicode = emoji.codePointAt(0)?.toString(16);
  // }
  // if (!unicode.startsWith('u')) {unicode = 'u' + unicode;}
  // return unicode;
}

/** @param {Discord.ChatInputCommandInteraction} int */
async function slashFunEmoji(int) {
  const emojiURLPrefixes = [
    20240715, 20240610, 20240530, 20240214, 20240206,
    20231128, 20231113, 20230821, 20230818, 20230803,
    20230426, 20230421, 20230418, 20230405, 20230301,
    20230221, 20230216, 20230127, 20230126, 20230118,
    20221107, 20221101, 20220823, 20220815, 20220506,
    20220406, 20220203, 20220110, 20211115, 20210831,
    20210521, 20210218, 20201001
  ];
  try {
    const emoji1 = int.options.getString("emoji1", true).trim();
    const emoji2 = int.options.getString("emoji2", true).trim();
    const emoji1unicode = unicodeify(emoji1);
    const emoji2unicode = unicodeify(emoji2);
    for (const pindex in emojiURLPrefixes) {
      const prefix = emojiURLPrefixes[pindex];
      // console.log("prefix");
      const urls = [
        `https://www.gstatic.com/android/keyboard/emojikitchen/${prefix}/${emoji1unicode}/${emoji1unicode}_${emoji2unicode}.png`,
        `https://www.gstatic.com/android/keyboard/emojikitchen/${prefix}/${emoji1unicode}/${emoji2unicode}_${emoji1unicode}.png`,
        `https://www.gstatic.com/android/keyboard/emojikitchen/${prefix}/${emoji2unicode}/${emoji1unicode}_${emoji2unicode}.png`,
        `https://www.gstatic.com/android/keyboard/emojikitchen/${prefix}/${emoji2unicode}/${emoji2unicode}_${emoji1unicode}.png`];
      // console.log(urls);
      for (const uindex in urls) {
        const url = urls[uindex];
        console.log(url);
        // @ts-ignore
        const response = await axios({ url, method: "get" }).catch(u.noop);
        if (response?.status == 200) {
          return int.editReply({ files: [{ attachment:url, name:"combined.png" }] });
        }
      }
    }
    return int.editReply(`I could not find an emojiKitchen combonation of ${emoji1} and ${emoji2}.`);
  } catch (error) { u.errorHandler(error);return int.editReply("error:" + error); }
}
const Module = new Augur.Module()
.addInteraction({
  name: "fun",
>>>>>>> Stashed changes
  id: u.sf.commands.slashFun,
  process: async (int) => {
    const subcommand = int.options.getSubcommand(true);
    await int.deferReply(); // { ephemeral: true });
    switch (subcommand) {
<<<<<<< Updated upstream
      case `roll`: return slashFunRoll(int);
      case `rollf`: return slashFunRollF(int);
      case `rollold`: return slashFunRollOld(int);
      case `8ball`: return slashFun8ball(int);
      case `repost`: return slashFunRepost(int);
      case `mines`: return slashFunMinesweeper(int);
      case `acronym`: return slashFunAcronym(int);
      case `allthe`: return slashFunAllThe(int);
      case `hbs`: return slashFunHBS(int);
      case `color`: return slashFunColor(int);
      case `hug`: return slashFunHug(int);
      case `buttermelon`: return slashFunButtermelon(int);
      case `quote`: return slashFunQuote(int);
      case `namegame`: return slashFunNamegame(int);
      case `chaos`: return slashFunChaos(int);
      default:
        u.errorLog.send({ embeds: [ u.embed().setDescription(`Error, command ${int} isn't associated with anything in fun.js`)] });
        return int.editReply(`Thats an error, this command isn't registered properly. I've let my devs know.`);
    }
  },
})
.addEvent(`message`, buttermelonEdit)
.addEvent(`messageUpdate`, (oldMsg, msg) => {
  if (oldMsg.partial || !(oldMsg.cleanContent.toLowerCase().includes(`banana`))) {
=======
      case "roll": return slashFunRoll(int);
      case "8ball": return slashFun8ball(int);
      case "repost": return slashFunRepost(int);
      case "mines": return slashFunMinesweeper(int);
      case "acronym": return slashFunAcronym(int);
      case "hbs": return slashFunHBS(int);
      case "color": return slashFunColor(int);
      case "buttermelon": return slashFunButtermelon(int);
      case "quote": return slashFunQuote(int);
      case "namegame": return slashFunNamegame(int);
      case "choose": return slashFunChoose(int);
      case "emoji": return slashFunEmoji(int);
      default:
        int.editReply("Thats an error, this command isn't registered properly. I've let my devs know.");
        throw new Error("Unhandled Subcommand");
    }
  },
})
.addEvent("messageCreate", buttermelonEdit)
.addEvent("messageUpdate", (oldMsg, msg) => {
  if (oldMsg.partial || !(oldMsg.cleanContent.toLowerCase().includes("banana"))) {
>>>>>>> Stashed changes
    buttermelonEdit(msg);
  }
// })
// .addEvent(
<<<<<<< Updated upstream
//   `messageReactionAdd`,
//   (reaction) => { // could have (reaction, user) as args but lint don't like unused var.
//     if ((reaction.message.channel.id == u.sf.channels.memes) && (reaction.emoji.name == `♻️`)) { //memes channel id will have to be added if this is to be enabled.
//       reaction.remove();
//       reaction.message.react(`⭐`).catch(u.errorHandler);
=======
//   "messageReactionAdd",
//   (reaction) => { // could have (reaction, user) as args but lint don't like unused var.
//     if ((reaction.message.channel.id == u.sf.channels.memes) && (reaction.emoji.name == "♻️")) { //memes channel id will have to be added if this is to be enabled, I don't know if it is still needed or even used by anyone.
//       reaction.remove();
//       reaction.message.react("⭐").catch(u.errorHandler);
>>>>>>> Stashed changes
//     }
});

module.exports = Module;