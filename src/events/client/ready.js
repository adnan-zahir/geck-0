const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! ${client.user.tag} is online.`);

    const options = {
      name: "La Cosa Nostra and the Omertà",
      type: ActivityType.Watching,
      status: "online",
    };

    // Rich Presence for Bots is not allowed for now
    // client.rpc();
    try {
      await client.user.setPresence({
        activities: [
          {
            name: options.name,
            type: options.type,
          },
        ],
        status: options.status,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
