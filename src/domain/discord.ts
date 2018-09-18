const postDiscord = () => {
  const id = config.id;
  const token = config.token
  const channel = config.channel;
  const endpoint = `https://discordapp.com/api/webhooks/${config.id}/${config.token}`;
  const method = 'post';
  const content = '';
  const username = '';
  const payload = { token, channel, content, username, parse: 'full' };
  const params = { payload, method: 'post', muteHttpExceptions: true };

  const res = UrlFetchApp.fetch(endpoint, params);
};
