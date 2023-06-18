const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("get-avatar")
    .setType(ApplicationCommandType.User),
  async execute(interaction, client) {
    await interaction.reply(interaction.targetUser.displayAvatarURL());
  },
};
