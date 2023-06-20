// const { REST, Routes } = require("@discordjs/rest");
const chalk = require("chalk");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

module.exports = (client) => {
  client.handleCommands = async () => {
    const foldersPath = path.join(__dirname, "../../commands");
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
        }
      }
      console.log(
        chalk.yellow(
          `Passed ${commandArray.length} commands through the handler`
        )
      );

      // const { clientId, token, guildId } = process.env;
      // const guildId = "715070460043198495"; // Voyager:Null
      // const guildId = "509365070694842379"; // Spongebobnism
      // const rest = new REST({ version: "9" }).setToken(token);
      // const rest = new REST().setToken(token);
      // try {
      //   console.log("Started refreshing application (/) commands.");
      //   const data = await rest.put(
      //     Routes.applicationGuildCommands(clientId, guildId),
      //     { body: commandArray }
      //   );
      // } catch (error) {
      //   console.error(error);
      // }
    }
  };
};
