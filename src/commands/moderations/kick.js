const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you'd like to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the action")
    )
    .addBooleanOption((option) =>
      option.setName("dm").setDescription("Send a DM to the target user?")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const sendDm = interaction.options.getBoolean("dm");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (sendDm)
      await user
        .send({
          content: `You have been kicked from ${interaction.guild.name}\nReason: ${reason}`,
        })
        .catch(console.error);

    await member.kick(reason).catch(console.error);
    await interaction.reply({
      content: `Kicked ${user.tag}\nReason: ${reason}`,
    });
  },
};
