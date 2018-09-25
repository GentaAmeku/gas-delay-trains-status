const _ = Underscore.load();

function startPostDiscord() {
  const delayTrains = fetchDelayTrains();
  const spreadSheet = fetchSpreadSheet(spreadSheetConfig);
  const users = createUsersFromSpreadSheet(spreadSheet);
  for (const user of users) {
    const targetDelayTrains = pickDelayTrains(delayTrains, user);
    const content = createContent(targetDelayTrains, user);
    postDiscord(content, user);
  }
}
