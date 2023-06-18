module.exports = {
  data: {
    name: "modal-test",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You have chosen ${interaction.fields.getTextInputValue(
        "favWordInp"
      )}`,
    });
  },
};
