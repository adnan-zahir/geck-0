module.exports = {
  data: {
    name: "socials",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Check it out! ${interaction.values[0]}`,
    });
  },
};
