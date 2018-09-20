const messageCreator = (message: string = '', delayTrain: Train) => {
  const date = new Date(Number(delayTrain.lastupdate_gmt) * 1000);
  const label = '遅延情報';
  let copyMessage = message;
  if (copyMessage.length === 0) {
    copyMessage += label;
  }
  copyMessage += `\n${delayTrain.name}(${delayTrain.company})`;
  return copyMessage;
};

const createContent = (delayTrains: Trains[]): string => {
  let content = '';
  if (delayTrains.length > 0) {
    const writeContent = delayTrain =>
      (content = messageCreator(content, delayTrain));
    delayTrains.forEach(writeContent);
  }
  return content;
};

const postDiscord = (content: string, { name }: User): void => {
  if (!content) {
    return;
  }
  const token = config.token;
  const channel = config.channel;
  const botName = '遅延情報';
  const endpoint = `https://discordapp.com/api/webhooks/${config.id}/${
    config.token
  }`;
  const payload = {
    token,
    channel,
    content,
    username: botName,
    avatar_url: 'https://image.winudf.com/v2/image/anAuY28uam9ydWRhbi5ucmtqX2ljb25fMTUzNjgxNDIwOV8wODg/icon.png?w=170&fakeurl=1&type=.png',
    parse: 'full',
  };
  const params = { payload, method: 'post', muteHttpExceptions: true };
  UrlFetchApp.fetch(endpoint, params);
};
