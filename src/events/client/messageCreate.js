const Intro = require("../../schemas/intro");
const chalk = require("chalk");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    try {
      const { channel } = message;

      // ASSIGN ALL FETCHED DATAS
      let intro = client.intro;
      if (Object.keys(intro).length === 0) {
        intro = await Intro.findOne({
          guildId: message.guild.id,
          channelId: channel.id,
        }).lean();

        if (!intro) return;
        Object.assign(client.intro, intro);
      }

      // INTRO INITIATION CHECK
      if (message.channelId === intro.channelId) {
        // If member does not have the specified role then retur
        const member = await message.member.fetch();
        const { roles, user } = member;
        const role = roles.resolve(intro.roleId.take);
        if (!role) return;

        // REACT TO THE MESSAGE
        await message.react(intro.defaultEmoji);
        console.log(
          chalk.italic(`Reacted to ${user.tag}'s introduction message.`)
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
};
