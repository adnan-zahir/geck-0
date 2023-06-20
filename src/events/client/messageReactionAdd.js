const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user, client) {
    const { message } = reaction;

    const reactor = message.guild.members.resolve(user.id);
    // If the reactor is a bot then return
    if (user.bot) return;
    // Check if the reactior has admin permission
    if (!reactor.permissions.has(PermissionFlagsBits.Administrator)) return;

    const sender = message.member;
    const { intro } = client;
    if (!intro || intro == {}) return;

    // REMOVE ROLE
    await sender.roles.remove(intro.roleId.take);
    // ADD ROLE
    await sender.roles.add(intro.roleId.give);
    console.log(`Switched ${sender.user.tag} roles`);
  },
};
