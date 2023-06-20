const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "check-game-select",
  },
  async execute(interaction, client) {
    const { memberPresences } = client;
    const filteredPresences = memberPresences.filter(
      (member) => member.presence.activities[0].name === interaction.values[0]
    );

    const act = interaction.values[0];

    const memberList = filteredPresences
      .map((member) => {
        return `- ${member.user.tag}\n`;
      })
      .join();
    const embed = new EmbedBuilder().setTitle(`Check Game`).addFields([
      { name: "Game / Activity", value: act, inline: true },
      {
        name: "Being Played by",
        value: `${
          filteredPresences.size > 1
            ? filteredPresences.size + "Members"
            : "1 Member"
        }`,
        inline: true,
      },
      {
        name: "Member List",
        value: memberList,
      },
    ]);

    try {
      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
