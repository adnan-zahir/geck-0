const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button-test")
    .setDescription("Return a button."),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setCustomId("open-repo")
      .setLabel("Open Bot Repo")
      .setStyle(ButtonStyle.Primary);

    const rowOne = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      components: [rowOne],
    });
  },
};
