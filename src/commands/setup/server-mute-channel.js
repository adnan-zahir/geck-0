const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const mongoose = require("mongoose");
const MuteChannel = require("../../schemas/muteChannel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server-mute-channel")
    .setDescription(
      "Set server mute to everyone that joins a specified voice channel."
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Voice Channel to set")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
    let channelProfile = await MuteChannel.findOne({ channelId: channel.id });

    if (!channelProfile) {
      channelProfile = new MuteChannel({
        _id: new mongoose.Types.ObjectId(),
        channelId: channel.id,
        guildId: interaction.guild.id,
        channelName: channel.name,
      });

      await interaction.deferReply({
        content: "Setting voice channel",
      });
      await channelProfile.save().catch(console.error);
      await interaction.editReply({
        content: `Saved channel <#${channelProfile.channelId}> to muted database.`,
      });
    } else {
      await interaction.reply({
        content: `Already saved <#${channelProfile.channelId}> to the muted database. Maybe you want to remove it?`,
        ephemeral: true,
      });
      await MuteChannel.deleteOne({
        channelId: channel.id,
      });
      await interaction.editReply({
        content: `Removed channel <#${channel.id}> from the muted database.`,
      });
    }
  },
};
