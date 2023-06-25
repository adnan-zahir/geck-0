require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: 32767,
});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.memberPresences = new Collection();
client.intro = {};
client.mutedArray = [];
client.letsPlay = {};
client.commandArray = [];
client.twitch = {};

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleCommands();
client.handleEvents();
client.handleComponents();

client.login(token);

(async () => await connect(databaseToken).catch(console.error))();
