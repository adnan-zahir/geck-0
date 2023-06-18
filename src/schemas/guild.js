const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: {
    type: String,
    required: true,
  },
  guildName: String,
  guildIcon: String,
});

module.exports = model("Guild", guildSchema, "guilds");
