const { ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-game")
    .setDescription("Check what everybody on this server plays!"),
  async execute(interaction, client) {
    try {
      const { memberPresences } = client;
      const options = [];

      const { guild } = interaction;
      await guild.members.fetch();
      const rawMembers = guild.members.cache;
      const dupeDetection = [];
      for (const [key, value] of rawMembers) {
        const { guild } = interaction;
        const presence = guild.presences.resolve(key);

        if (!presence) continue;
        if (value.user.bot) continue;
        if (presence.activities.length == 0) continue;

        const actName = presence.activities[0].name;
        if (actName === "Custom Status") continue;

        if (dupeDetection.includes(actName)) continue;
        dupeDetection.push(actName);

        const presenceData = {
          user: value.user,
          presence,
        };

        memberPresences.set(key, presenceData);
        options.push({
          label: actName,
          value: actName,
        });
      }

      const menu = new StringSelectMenuBuilder()
        .setCustomId("check-game-select")
        .setPlaceholder("Select Game / Activity")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions(options);

      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
