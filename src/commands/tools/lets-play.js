require("dotenv").config();
const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const LetsPlay = require("../../schemas/letsPlay");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lets-play")
    .setDescription("Invite people on the server to play with your party!"),
  async execute(interaction, client) {
    // ASSIGN ALL FETCHED DATAS
    let letsPlay = client.letsPlay;
    if (Object.keys(letsPlay).length === 0) {
      letsPlay = await LetsPlay.findOne({
        guildId: interaction.guildId,
      }).lean();

      if (!letsPlay) {
        // No channel found on db
        await interaction.reply({
          content: "Set up a channel to be a let's play channel first!",
          ephemeral: true,
        });
        return;
      }
      Object.assign(client.letsPlay, letsPlay);
    }

    if (interaction.channelId !== letsPlay.channelId) {
      // If not in lets play channel then return;
      await interaction.reply({
        content: "Only use this command on the let's play channel!",
        ephemeral: true,
      });
    } else {
      const modal = new ModalBuilder()
        .setCustomId("lets-play-modal")
        .setTitle("Invite People to Play");

      const gameInp = new TextInputBuilder()
        .setCustomId("game")
        .setLabel("Game Name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const partyInp = new TextInputBuilder()
        .setCustomId("party")
        .setLabel("Party Size Missing")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const descInp = new TextInputBuilder()
        .setCustomId("desc")
        .setLabel("Description")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

      const arOne = new ActionRowBuilder().addComponents(gameInp);
      const arTwo = new ActionRowBuilder().addComponents(partyInp);
      const arThree = new ActionRowBuilder().addComponents(descInp);

      modal.addComponents(arOne, arTwo, arThree);

      await interaction.showModal(modal).catch(console.error);
    }
  },
};
