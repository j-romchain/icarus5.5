// @ts-check
const u = require('./regUtils');

const roll = new u.sub()
  .setName("roll")
  .setDescription("Roll Dice")
  .addIntegerOption(
    new u.int()
    .setName("dice")
<<<<<<< Updated upstream
    .setDescription("How many dice to roll? (will roll at least 1 anyway) (max of 10000)")
=======
    .setDescription("How many dice to roll? (Default: 1)")
>>>>>>> Stashed changes
    .setRequired(false)
    .setMinValue(1)
    .setMaxValue(10000)
  )
  .addIntegerOption(
    new u.int()
    .setName("sides")
<<<<<<< Updated upstream
    .setDescription("How many sides on the dice to roll? (defaults to 6)")
    .setRequired(false)
    .setMinValue(1)
    .setMaxValue(2147483647)
=======
    .setDescription("How many sides on the dice? (Default: 6)")
    .setRequired(false)
    .setMinValue(1)
    .setMaxValue(100000)
>>>>>>> Stashed changes
  )
  .addIntegerOption(
    new u.int()
    .setName("modifier")
<<<<<<< Updated upstream
    .setDescription("How much to change the roll by? (defaults to 0)")
    .setRequired(false)
  );
const rollF = new u.sub()
  .setName("rollf")
  .setDescription("Roll Fate Dice")
  .addIntegerOption(
    new u.int()
    .setName("dice")
    .setDescription("How many dice to roll? (will roll at least 1 anyway) (max of 10000)")
    .setRequired(false)
    .setMinValue(1)
    .setMaxValue(10000)
  )
  .addIntegerOption(
    new u.int()
    .setName("modifier")
    .setDescription("How much to change the roll by? (defaults to 0)")
    .setRequired(false)
  );
const rollOld = new u.sub()
  .setName("rollold")
  .setDescription("Roll Dice using the old formula format")
  .addStringOption(
    new u.string()
    .setName("rollformula")
    .setDescription("old dice formula to use, it errors in the same way as !roll did")
  );
=======
    .setDescription("How much to change the roll by. (Default: 0)")
    .setRequired(false)
  );
>>>>>>> Stashed changes
const ball8 = new u.sub()
  .setName("8ball")
  .setDescription("Get an answer from the Magic 8-ball.")
  .addStringOption(
    new u.string()
    .setName("question")
    .setDescription("What do you wish to ask the 8-ball today?")
    .setRequired(true)
  );
<<<<<<< Updated upstream
const allthe = new u.sub()
  .setName("allthe")
  .setDescription("ALL THE _____!")
  .addStringOption(
    new u.string()
    .setName("thing")
    .setDescription("something")
=======
const choose = new u.sub()
  .setName("choose")
  .setDescription("Helps make a choice!")
  .addStringOption(
    new u.string()
    .setName("options")
    .setDescription('options to choose from separated by "|"')
    .setRequired(true)
  );
const emoji = new u.sub()
  .setName("emoji")
<<<<<<< Updated upstream
  .setDescription("combines two (non-custom) emoji")
  .addStringOption(
    new u.string()
    .setName("emoji1")
    .setDescription("first emoji to combine")
    .setRequired(true)
  )
  .addStringOption(
    new u.string()
    .setName("emoji2")
    .setDescription("second emoji to combine")
>>>>>>> Stashed changes
    .setRequired(true)
=======
  .setDescription("Combines two (non-custom) or enlarges one (any) emoji")
  .addStringOption(
    new u.string()
      .setName("emoji1")
      .setDescription("First emoji to combine, or enlarge")
      .setRequired(true)
  )
  .addStringOption(
    new u.string()
      .setName("emoji2")
      .setDescription("Second emoji to combine")
      .setRequired(false)
>>>>>>> Stashed changes
  );
const repost = new u.sub()
.setName("repost")
.setDescription("That's a repost.");
const acronym = new u.sub()
.setName("acronym")
.setDescription("Get a random acronym. For science.")
.addIntegerOption(
  new u.int()
  .setName("length")
<<<<<<< Updated upstream
  .setDescription("How long of an acronym? min/max of 1/10 (defaults to random 3/5)")
=======
  .setDescription("How long of an acronym?")
>>>>>>> Stashed changes
  .setRequired(false)
  .setMinValue(1)
  .setMaxValue(10)
);
<<<<<<< Updated upstream
const chaos = new u.sub()
.setName("chaos")
.setDescription("You just walked into chaos.");
=======
>>>>>>> Stashed changes
const mines = new u.sub()
  .setName("mines")
  .setDescription("Play a game of Minesweeper!")
  .addStringOption(
    new u.string()
    .setName("difficulty")
<<<<<<< Updated upstream
    .setDescription("5 by 5 with 5 mines, 10 by 10 with 30 mines, or 14 by 14 with 60 mines")
=======
    .setDescription("5 by 5 with 5 mines, 10 by 10 with 30 mines, or 10 by 18 with 60 mines")
>>>>>>> Stashed changes
    .setRequired(true)
    .setChoices(
      { name: "Easy", value: "Easy" },
      { name: "Medium", value: "Medium" },
      { name: "Hard", value: "Hard" })
<<<<<<< Updated upstream
=======
  )
  .addIntegerOption(
    new u.int()
    .setName("width")
    .setDescription("override the width of the minefeild.")
    .setMinValue(3)
    .setMaxValue(99)
  )
  .addIntegerOption(
    new u.int()
    .setName("height")
    .setDescription("override the height of the minefeild.")
    .setMinValue(1)
    .setMaxValue(99)
  )
  .addIntegerOption(
    new u.int()
    .setName("minecount")
    .setDescription("override the number of mines in the minefeild. (spaces get freed first)")
    .setMinValue(0)
  )
  .addIntegerOption(
    new u.int()
    .setName("preclickcount")
    .setDescription("override the preopened spaces in the minefeild.")
    .setMinValue(0)
>>>>>>> Stashed changes
  );
const hbs = new u.sub()
  .setName("hbs")
  .setDescription("Play a game of Handicorn, Buttermelon, Sloth!")
  .addStringOption(
    new u.string()
    .setName("choice")
<<<<<<< Updated upstream
    .setDescription("your choice of Handicorn, Buttermelon, or Sloth!")
=======
    .setDescription("Your choice of Handicorn, Buttermelon, or Sloth!")
>>>>>>> Stashed changes
    .setRequired(true)
    .setChoices(
      { name: "Handicorn", value: "Handicorn" },
      { name: "Buttermelon", value: "Buttermelon" },
      { name: "Sloth", value: "Sloth" })
  )
  .addStringOption(
    new u.string()
    .setName("mode")
<<<<<<< Updated upstream
    .setDescription("vs icarus or vs another user")
    // .setRequired(false)
    .setChoices(
      { name: "icarus", value: "icarus" },
      { name: "user", value: "user" })
=======
    .setDescription("Who do you want to play against?")
    // .setRequired(false)
    .setChoices(
      { name: "Icarus", value: "icarus" },
      { name: "Other Users", value: "user" })
>>>>>>> Stashed changes
  );

const color = new u.sub()
  .setName("color")
  .setDescription("Show what a color looks like.")
  .addStringOption(
    new u.string()
    .setName("color")
    .setDescription("color (e.g. `#003B6F` or `blue`)")
  );
<<<<<<< Updated upstream
const hug = new u.sub()
  .setName("hug")
  .setDescription("Send a much needed hug.")
  .addUserOption(
    new u.user()
    .setName("hugee")
    .setDescription("Who do you want to hug?")
    .setRequired(true)
  );
const nameGame = new u.sub()
  .setName("namegame")
  .setDescription("Play the Name Game! (lyric generator)")
  .addStringOption(
    new u.string()
    .setName("name")
    .setDescription("(One word only, no special chars, defaults to your global displayname)")
=======
const nameGame = new u.sub()
  .setName("namegame")
  .setDescription("Sing the Name Game!")
  .addStringOption(
    new u.string()
    .setName("name")
    .setDescription("The name to play with (Default: your username)")
>>>>>>> Stashed changes
  );
const quote = new u.sub()
  .setName("quote")
  .setDescription("Get a random quote!");
const buttermelon = new u.sub()
  .setName("buttermelon")
<<<<<<< Updated upstream
  .setDescription("Buttermelon facts");
=======
  .setDescription("Get a random buttermelon fact");
>>>>>>> Stashed changes
module.exports = new u.cmd()
  .setName("fun")
  .setDescription("Its all fun and games till someone gets banned.")
  .addSubcommand(roll)
<<<<<<< Updated upstream
  .addSubcommand(rollF)
  .addSubcommand(rollOld)
=======
>>>>>>> Stashed changes
  .addSubcommand(ball8)
  .addSubcommand(repost)
  .addSubcommand(mines)
  .addSubcommand(acronym)
<<<<<<< Updated upstream
  .addSubcommand(allthe)
  .addSubcommand(hbs)
  .addSubcommand(color)
  .addSubcommand(hug)
  .addSubcommand(buttermelon)
  .addSubcommand(quote)
  .addSubcommand(nameGame)
  .addSubcommand(chaos)
=======
  .addSubcommand(hbs)
  .addSubcommand(color)
  .addSubcommand(buttermelon)
  .addSubcommand(quote)
  .addSubcommand(nameGame)
  .addSubcommand(choose)
  .addSubcommand(emoji)
>>>>>>> Stashed changes
  .toJSON();
