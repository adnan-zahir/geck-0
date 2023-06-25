const axios = require("axios").default;

module.exports = async (client) => {
  client.getGameNames = async (twitchId, access_token) => {
    console.log(access_token);
    if (!access_token) return;
    const response = await axios.post(
      `https://api.igdb.com/v4/games`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Client-ID": twitchId,
          Authorization: `Bearer ${access_token}`,
        },
        data: "fields name",
      }
    );

    return response.data ?? new Error("Can't get data");
  };
};
