const MuteChannel = require("../../schemas/muteChannel");

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    // If the user leaves to nothing then return
    if (newState.channelId === null) return;

    // If it happens in the same channel then return
    if (oldState.channelId === newState.channelId) return;

    // ALWAYS UNMUTE USER WHENEVER THEY JOIN A VOICE CHANNEL
    if (newState.serverMute) {
      newState.setMute(false);
    }

    // Find if the new channel is listed
    const channelProfile = await MuteChannel.findOne({
      channelId: newState.channelId,
    });

    // If it does not happen in the listed channel then return
    if (!channelProfile) return;

    // USER JOIN
    console.log(
      `User ${newState.member.user.tag} joins ${
        channelProfile.channelName || channelProfile.channelId
      }`
    );

    const laraBot = "944016826751389717";
    // Whitelist Lara bot
    if (newState.member.id == laraBot) return;
    await newState.setMute();
    console.log(`Muted ${newState.member.user.tag}`);
  },
};
