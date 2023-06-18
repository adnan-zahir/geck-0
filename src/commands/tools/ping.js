const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });
    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;
    interaction.editReply({ content: newMessage });
  },
};
