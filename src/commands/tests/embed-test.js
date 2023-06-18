const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed-test")
    .setDescription("Sends a test embed."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Embed Example")
      .setDescription("Example description")
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: "https://github.com/adnan-zahir",
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://github.com/adnan-zahir`)
      .addFields([
        {
          name: "Field One",
          value: "Lorem ipsum",
          inline: true,
        },
        {
          name: "Field Two",
          value: "Dolor sit amet",
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
