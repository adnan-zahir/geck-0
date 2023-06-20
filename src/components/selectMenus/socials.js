module.exports = {
  data: {
    name: "socials",
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({
        content: `Check it out! ${interaction.values[0]}`,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
