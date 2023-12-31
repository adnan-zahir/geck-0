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
      const rawMembers = await guild.members.fetch();
      const dupeDetection = [];
      for (const [key, member] of rawMembers) {
        const presence = guild.presences.resolve(key);

        if (!presence) continue;
        if (member.user.bot) continue;
        if (presence.activities.length == 0) continue;

        const actName = presence.activities[0].name;
        if (actName === "Custom Status") continue;

        const presenceData = {
          user: member.user,
          presence,
        };
        memberPresences.set(key, presenceData);

        if (dupeDetection.includes(actName)) continue;
        dupeDetection.push(actName);

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
