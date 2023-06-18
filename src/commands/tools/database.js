const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../schemas/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Returns informations of a database")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    let guildProfile = await Guild.findOne({
      guildId: interaction.guild.id,
    });

    if (!guildProfile) {
      guildProfile = new Guild({
        _id: new mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "none",
      });

      await interaction.deferReply({
        content: "Guild information did not exist on database, saving...",
      });
      await guildProfile.save().catch(console.error);
      await interaction.editReply({
        content: `Saved\nGuild Name: ${guildProfile.guildName}\nGuild ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Retrieved\nGuild Name: ${guildProfile.guildName}\nGuild ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
