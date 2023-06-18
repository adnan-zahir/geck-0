const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permission-test")
    .setDescription("This command requires permission.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const { roles } = interaction.member;
    try {
      const testSubjectRoleId = "1116397852042727474";

      await interaction.reply({
        content: `You ${
          roles.cache.has(testSubjectRoleId) || "don't"
        } have the Test Subject role.`,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
