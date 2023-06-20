const { Schema, model } = require("mongoose");

const introSchema = new Schema({
  _id: Schema.Types.ObjectId,
  roleId: {
    take: {
      type: String,
      required: true,
    },
    give: {
      type: String,
      required: true,
    },
  },
  channelId: {
    type: String,
    required: true,
  },
  defaultEmoji: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
});

module.exports = model("Intro", introSchema, "intros");
