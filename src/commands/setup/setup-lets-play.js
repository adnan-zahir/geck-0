const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const mongoose = require("mongoose");
const LetsPlay = require("../../schemas/letsPlay");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-lets-play")
    .setDescription("Setup lets play channel.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Introduction Channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");

    let letsPlay = await LetsPlay.find({
      guildId: interaction.guild.id,
    }).exec();

    if (!letsPlay || letsPlay.length === 0) {
      letsPlay = new LetsPlay({
        _id: new mongoose.Types.ObjectId(),
        channelId: channel.id,
        guildId: interaction.guild.id,
        channelName: channel.name,
      });

      await letsPlay.save().catch(console.error);
      await interaction.reply({
        content: `Saved channel <#${letsPlay.channelId}> to Lets Play database.`,
        ephemeral: true,
      });
    } else {
      await LetsPlay.deleteMany({});
      letsPlay = new LetsPlay({
        _id: new mongoose.Types.ObjectId(),
        channelId: channel.id,
        guildId: interaction.guild.id,
        channelName: channel.name,
      });

      await letsPlay.save().catch(console.error);
      const newLetsPlay = await LetsPlay.findOne({
        guildId: interaction.guild.id,
        channelId: channel.id,
      }).lean();
      Object.assign(client.letsPlay, newLetsPlay);
      await interaction.reply({
        content: `Updated channel <#${channel.id}> as the Lets Play channel.`,
        ephemeral: true,
      });
    }
  },
};
