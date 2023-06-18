const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal-test")
    .setDescription("Shows a test modal."),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("modal-test")
      .setTitle("Test Modal");

    const textInp = new TextInputBuilder()
      .setCustomId("favWordInp")
      .setLabel("What is your favorite word?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const arOne = new ActionRowBuilder().addComponents(textInp);
    modal.addComponents(arOne);

    await interaction.showModal(modal);
  },
};
