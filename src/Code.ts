declare var UrlFetchApp: any;

const mapToRow = (names: Object[][], trains: Object[][]) => {
  if (names.length !== trains.length) {
    return [];
  }
  const results = [];
  names.forEach((name, index) => {
    results.push({ name: name[0], trains: trains[index][0] });
  });
  return results;
};

const fetchDelayTrains = () => {
  const TETSUDO_ENDPOINT =
    'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json';
  return UrlFetchApp.fetch(TETSUDO_ENDPOINT);
};

const filterDelayTrains = () => {

};

const fetchSpreadSheet = () => {
  const SPREADSHEETID = '1JiaOSinQSYaQLJkNsFuMHP98xMbMPdMG15eU-S4ynpU';
  const SHEETNAME = 'register';
  const spreadSheet = SpreadsheetApp.openById(SPREADSHEETID);
  const sheat = spreadSheet.getSheetByName(SHEETNAME);
  const names = sheat.getRange(2, 1, sheat.getLastRow() - 1).getValues();
  const trains = sheat.getRange(2, 2, sheat.getLastRow() - 1).getValues();
  return mapToRow(names, trains);
};

const postDiscord = () => {
  const id = '491272344053219328';
  const token =
    'z3hulGFH85yffFlmsjYR0fXUrWZ1LA9qzgN2FZHG007rhaQbqQ5oinFSZ85uHHivpYPt';
  const url = `https://discordapp.com/api/webhooks/${id}/${token}`;
  const channel = '#general';
  const content = '';
  const username = '';
  const method = 'post';
  const payload = { token, channel, content, username, parse: 'full' };
  const params = { payload, method: 'post', muteHttpExceptions: true };

  const res = UrlFetchApp.fetch(url, params);
};

function startSearchDelayTrains() {
  fetchDelayTrains();
}
