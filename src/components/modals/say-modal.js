module.exports = {
  data: {
    name: "say-modal",
  },
  async execute(interaction, client) {
    const text = interaction.fields.getTextInputValue("text");

    await interaction.reply({
      content: `Sending...`,
      ephemeral: true,
    });

    interaction.channel.send({
      content: text,
    });

    await interaction.editReply(`Sent`);
  },
};
