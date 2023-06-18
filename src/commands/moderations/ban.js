const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you'd like to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the action")
    )
    .addIntegerOption((option) =>
      option
        .setName("purge")
        .setDescription("(Days) Purge the target messages for _ days")
        .setMinValue(0)
        .setMaxValue(7)
    )
    .addBooleanOption((option) =>
      option.setName("dm").setDescription("Send a DM to the target user?")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const purge = interaction.options.getInteger("purge") || 0;
    const sendDm = interaction.options.getBoolean("dm");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (sendDm)
      await user
        .send({
          content: `You have been banned from ${interaction.guild.name}\nReason: ${reason}`,
        })
        .catch(console.error);

    await member
      .ban({
        deleteMessageSeconds: purge * 60 * 60 * 24,
        reason: reason,
      })
      .catch(console.error);
    await interaction.reply({
      content: `Banned ${user.tag}\nReason: ${reason}`,
    });
  },
};
