const { Schema, model } = require("mongoose");

const muteChannelSchema = new Schema({
  _id: Schema.Types.ObjectId,
  channelId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  channelName: String,
});

module.exports = model("MuteChannel", muteChannelSchema, "muteChannels");
