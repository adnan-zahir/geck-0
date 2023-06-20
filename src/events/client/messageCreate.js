const Intro = require("../../schemas/intro");
const chalk = require("chalk");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    try {
      const { channel } = message;
      const intro = await Intro.findOne({
        channelId: channel.id,
      });

      // If message is not in the setup channel then return
      if (!intro) return;

      // If member does not have the specified role then retur
      const member = await message.member.fetch();
      const { roles, user } = member;
      const role = roles.resolve(intro.roleId.take);
      if (!role) return;

      // REACT TO THE MESSAGE
      Object.assign(client.intro, intro._doc);
      await message.react(intro.defaultEmoji);
      console.log(
        chalk.italic(`Reacted to ${user.tag}'s introduction message.`)
      );
    } catch (error) {
      console.error(error);
    }
  },
};
