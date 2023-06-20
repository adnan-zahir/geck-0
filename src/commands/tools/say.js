const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot says specified text to selected channel.")
    .addStringOption((option) =>
      option.setName("text").setDescription("Message to send").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to send the message to")
        .addChannelTypes(
          ChannelType.GuildText,
          ChannelType.GuildAnnouncement,
          ChannelType.GuildForum
        )
    ),
  async execute(interaction, client) {
    const text = interaction.options.getString("text");
    const channel =
      interaction.options.getChannel("channel") ?? interaction.channel;

    channel.send({
      content: text,
    });

    await interaction.reply({
      content: `Sending`,
      ephemeral: true,
    });
    await interaction.deleteReply();
  },
};
