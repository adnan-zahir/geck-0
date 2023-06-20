const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "check-game-select",
  },
  async execute(interaction, client) {
    const { memberPresences } = client;
    const act = interaction.values[0];
    const filteredPresences = memberPresences.filter(
      (member) => member.presence.activities[0].name === act
    );

    const memberList = filteredPresences
      .map((member) => {
        return `- ${member.user.tag}`;
      })
      .join("\n");
    const embed = new EmbedBuilder().setTitle("Check Game").addFields([
      { name: "Game / Activity", value: act, inline: true },
      {
        name: "Being Played by",
        value: `${filteredPresences.size} Member(s)`,
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
