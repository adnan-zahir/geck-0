const { Schema, model } = require("mongoose");

const letsPlaySchema = new Schema({
  _id: Schema.Types.ObjectId,
  channelId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
  },
});

module.exports = model("LetsPlay", letsPlaySchema, "letsPlay");
