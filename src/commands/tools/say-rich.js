const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say-rich")
    .setDescription(
      "Make the bot says specified text with rich text formatting."
    ),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("say-modal")
      .setTitle("Say Modal");

    const textInp = new TextInputBuilder()
      .setCustomId("text")
      .setLabel("Text")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const arOne = new ActionRowBuilder().addComponents(textInp);
    modal.addComponents(arOne);

    await interaction.showModal(modal);
  },
};
