const messageCreator = (message: string = '', delayTrain: Train) => {
  const date = new Date(Number(delayTrain.lastupdate_gmt) * 1000);
  const label = '遅延情報';
  let _message = message;
  if (_message.length === 0) {
    _message += label;
  }
  _message += `\n${delayTrain.name}(${delayTrain.company})`;
  return _message;
};

const createContent = (delayTrains: Trains[]): string => {
  let content = '';
  const writeContent = delayTrain =>
    (content = messageCreator(content, delayTrain));

  delayTrains.forEach(writeContent);
  return content;
};

const postDiscord = (content: string, { name: username }: User) => {
  const token = config.token;
  const channel = config.channel;
  const endpoint = `https://discordapp.com/api/webhooks/${config.id}/${
    config.token
  }`;
  const payload = { token, channel, content, username, parse: 'full' };
  const params = { payload, method: 'post', muteHttpExceptions: true };
  UrlFetchApp.fetch(endpoint, params);
};
