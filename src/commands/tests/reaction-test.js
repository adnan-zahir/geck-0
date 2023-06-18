const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reaction-test")
    .setDescription("React to a message example."),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "React here",
      fetchReply: true,
    });

    const terrariaEmoji = client.emojis.cache.find(
      (emoji) => emoji.id == "866274856940208169"
    );

    message.react(terrariaEmoji);
    message.react("💫");

    const filter = (reaction, user) => {
      return reaction.emoji.name == "💫" && user.id == interaction.user.id;
    };
    const collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) =>
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`)
    );
    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  },
};
