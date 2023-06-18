const { ActionRowBuilder } = require("discord.js");
const { StringSelectMenuOptionBuilder } = require("discord.js");
const { SlashCommandBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription("Show the socials of this community server!"),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("socials")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("Instagram")
          .setValue("https://instagram.com/voyager.null"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Github Repo")
          .setValue("https://github.com/adnan-zahir/geck-0.git"),
      ]);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
