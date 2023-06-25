const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "lets-play-modal",
  },
  async execute(interaction, client) {
    const { fields } = interaction;
    const game = fields.getTextInputValue("game");
    const party = fields.getTextInputValue("party");
    const desc = fields.getTextInputValue("desc");

    const embedFields = [
      {
        name: "Inviter",
        value: interaction.user.tag,
        inline: true,
      },
      {
        name: "Looking for",
        value: `${party ? party : "Any number of"} player(s)`,
        inline: true,
      },
    ];
    if (!!desc)
      embedFields.push({
        name: "Description",
        value: desc,
      });

    const embed = new EmbedBuilder()
      .setTitle(game.toUpperCase())
      .setDescription("**[[ Interested ]]**")
      .addFields(embedFields);

    try {
      const message = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
      });
      await message.react("☝️");
    } catch (error) {
      console.error(error);
    }
  },
};
