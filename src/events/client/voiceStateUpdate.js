const MuteChannel = require("../../schemas/muteChannel");

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState, client) {
    // If the user leaves to nothing then return
    if (newState.channelId === null) return;

    // If it happens in the same channel then return
    if (oldState.channelId === newState.channelId) return;

    // ALWAYS UNMUTE USER WHENEVER THEY JOIN A VOICE CHANNEL
    if (newState.serverMute) {
      newState.setMute(false);
    }

    // ASSIGN ALL FETCHED DATAS
    let mutedArray = client.mutedArray;
    if (mutedArray.length === 0) {
      const muteChannels = await MuteChannel.find({
        guildId: newState.guild.id,
      }).exec();

      if (!muteChannels || muteChannels.length === 0) return;
      mutedArray = muteChannels;
      Object.assign(client.mutedArray, muteChannels);
    }

    // MUTED CHANNEL CHECK
    for (const muted of mutedArray) {
      if (muted.channelId === newState.channelId) {
        console.log(
          `User ${newState.member.user.tag} joins ${
            muted.channelName || muted.channelId
          }`
        );

        // Don't mute bots
        if (newState.member.user.bot) return;
        await newState.setMute();
        console.log(`Muted ${newState.member.user.tag}`);
      }
    }
  },
};
