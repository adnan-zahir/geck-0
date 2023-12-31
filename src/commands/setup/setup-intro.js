const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const mongoose = require("mongoose");
const Intro = require("../../schemas/intro");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-intro")
    .setDescription("Setup introduction channel and roles")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Introduction Channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("take")
        .setDescription(
          "The newcomer role. (For detection and to take when member is verified)"
        )
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("give")
        .setDescription("What roles to give when a member is verified?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("Default emoji for reaction.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
    const takeRole = interaction.options.getRole("take");
    const giveRole = interaction.options.getRole("give");
    const emoji = interaction.options.getString("emoji");
    let intro = await Intro.find({
      guildId: interaction.guild.id,
    }).exec();

    if (!intro || intro.length === 0) {
      intro = new Intro({
        _id: new mongoose.Types.ObjectId(),
        roleId: {
          take: takeRole.id,
          give: giveRole.id,
        },
        channelId: channel.id,
        defaultEmoji: emoji,
        guildId: interaction.guild.id,
      });

      await intro.save().catch(console.error);
      await interaction.reply({
        content: `Saved channel <#${intro.channelId}> to intro database.`,
        ephemeral: true,
      });
    } else {
      await Intro.deleteMany({});
      intro = new Intro({
        _id: new mongoose.Types.ObjectId(),
        roleId: {
          take: takeRole.id,
          give: giveRole.id,
        },
        channelId: channel.id,
        defaultEmoji: emoji,
        guildId: interaction.guild.id,
      });

      await intro.save().catch(console.error);
      const newIntro = await Intro.findOne({
        guildId: interaction.guild.id,
        channelId: channel.id,
      }).lean();
      Object.assign(client.intro, newIntro);
      await interaction.reply({
        content: `Updated channel <#${channel.id}> as the intro channel.`,
        ephemeral: true,
      });
    }
  },
};
