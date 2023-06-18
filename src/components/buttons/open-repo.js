module.exports = {
  data: {
    name: "open-repo",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: "https://github.com/adnan-zahir/geck-0.git",
    });
  },
};
