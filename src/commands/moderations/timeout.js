const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeouts a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you'd like to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("(Minutes) Timeout the target for _ minutes")
        .setMinValue(1)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the action")
    )
    .addBooleanOption((option) =>
      option.setName("dm").setDescription("Send a DM to the target user?")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const time = interaction.options.getInteger("time");
    const sendDm = interaction.options.getBoolean("dm");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (sendDm)
      await user
        .send({
          content: `You have been timeout'd from ${interaction.guild.name}\nReason: ${reason}`,
        })
        .catch(console.error);

    await member
      // Turn ms to minutes
      .timeout(time * 60 * 1000, reason)
      .catch(console.error);
    await interaction.reply({
      content: `Banned ${user.tag}\nReason: ${reason}`,
    });
  },
};
