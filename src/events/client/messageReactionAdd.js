const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user, client) {
    const { intro, letsPlay } = client;
    const { message } = reaction;
    // INTRO INITIATION CHECK
    if (message.channelId === intro.channelId) {
      const reactor = message.guild.members.resolve(user.id);
      // If the reactor is a bot then return
      if (user.bot) return;
      // Check if the reactior has admin permission
      if (!reactor.permissions.has(PermissionFlagsBits.Administrator)) return;

      const sender = message.member;

      // REMOVE ROLE
      await sender.roles.remove(intro.roleId.take);
      // ADD ROLE
      await sender.roles.add(intro.roleId.give);
      console.log(`Switched ${sender.user.tag} roles`);
    } else if (message.channelId === letsPlay.channelId) {
      // If the reactor is a bot then return
      if (user.bot) return;

      const embed = message.embeds[0];
      // If the reactor is bot then return
      if (user.bot) return;
      // If the reactor is already listed then return
      if (embed.description.includes(user.tag)) return;
      const newEmbed = EmbedBuilder.from(embed).setDescription(
        `${embed.description}\n- ${user.tag}`
      );

      await message.edit({
        embeds: [newEmbed],
      });
    }
  },
};
