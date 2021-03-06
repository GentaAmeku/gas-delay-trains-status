const makeContent = (content: string = '', delayTrain: Train) => {
  // const date = new Date(Number(delayTrain.lastupdate_gmt) * 1000);
  return content += `\n* ${delayTrain.name}(${delayTrain.company})`;
};

const createContent = (delayTrains: Trains[], { name }: User): string => {
  if (!delayTrains || delayTrains.length === 0) {
    return `**${name}**: 本日の遅延情報はありません。`;
  }
  let content = `**${name}**`;
  _.each(delayTrains, delayTrain => content = makeContent(content, delayTrain));
  return content;
};

const postDiscord = (content: string, { name }: User): void => {
  if (!content) {
    return;
  }
  const botName = '遅延情報';
  const endpoint = `https://discordapp.com/api/webhooks/${discordConfig.id}/${discordConfig.token}`;
  const avatarUrl = 'https://image.winudf.com/v2/image/anAuY28uam9ydWRhbi5ucmtqX2ljb25fMTUzNjgxNDIwOV8wODg/icon.png?w=170&fakeurl=1&type=.png';
  const payload = {
    token: discordConfig.token
    channel: discordConfig.channel
    content,
    username: botName,
    avatar_url: avatarUrl,
    parse: 'full',
  };
  Logger.log(payload);
  UrlFetchApp.fetch(endpoint, { payload, method: 'post', muteHttpExceptions: true });
};
