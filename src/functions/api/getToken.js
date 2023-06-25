const axios = require("axios").default;

module.exports = async (client) => {
  client.getToken = async (twitchId, twitchSecret) => {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${twitchId}&client_secret=${twitchSecret}&grant_type=client_credentials`
    );

    return response.data || new Error("Can't get token");
  };
};
