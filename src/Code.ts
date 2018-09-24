const SPREADSHEETID = '1JiaOSinQSYaQLJkNsFuMHP98xMbMPdMG15eU-S4ynpU';
const SHEETNAME = 'register';

function startPostDiscord() {
  const delayTrains = fetchDelayTrains();
  const spreadSheet = fetchSpreadSheet({
    id: SPREADSHEETID,
    sheetName: SHEETNAME,
  });
  const users = createUsersFromSpreadSheet(spreadSheet);
  for (const user of users) {
    const targetDelayTrains = pickDelayTrains(delayTrains, user);
    const content = createContent(targetDelayTrains), user);
    const message = content ? content : '本日の遅延情報はありません。';
    postDiscord(message, user);
  }
}
