const SPREADSHEETID = '1JiaOSinQSYaQLJkNsFuMHP98xMbMPdMG15eU-S4ynpU';
const SHEETNAME = 'register';

const trainStrToObject = (trainNames: string): Train[] => {
  if (typeof trainNames !== 'string') {
    return [];
  }
  const trainsArray: string[] = trainNames.split(',');
  return trainsArray.map(trainInfo => {
    const name = trainInfo.slice(0, trainInfo.indexOf('/'));
    const company = trainInfo.slice(trainInfo.indexOf('/') + 1);
    return { name, company };
  });
};

const mapToRow = (
  nameColumn: string[][],
  trainColumn: string[][],
): User[] | [] =>
  nameColumn.map((name, index) => {
    const targetTrains = trainColumn[index] ? trainColumn[index][0] : null;
    return { name: name[0], trains: trainStrToObject(targetTrains) };
  });

const pickDelayTrains = (delayTrains: Train[] = [], user: User): Train[] => {
  const results = [];
  user.trains.forEach(train => {
    const foundTrains = delayTrains.find(
      delayTrain =>
        delayTrain.name === train.name && delayTrain.company === train.company,
    );
    results.push(foundTrains);
  });
  return results;
};

const fetchSpreadSheet = ({
  id,
  sheetName,
}: {
  id: string;
  sheetName: string;
}) => SpreadsheetApp.openById(id).getSheetByName(sheetName);

const createUsersFromSpreadSheet = (spreadsheet): User[] => {
  const nameColumn = spreadsheet
    .getRange(2, 1, spreadsheet.getLastRow() - 1)
    .getValues();
  const trainColumn = spreadsheet
    .getRange(2, 2, spreadsheet.getLastRow() - 1)
    .getValues();
  return mapToRow(nameColumn, trainColumn);
};

function startSearchDelayTrains() {
  const delayTrains = fetchDelayTrains();
  const spreadSheet = fetchSpreadSheet({
    id: SPREADSHEETID,
    sheetName: SHEETNAME,
  });
  const users = createUsersFromSpreadSheet(spreadSheet);
}
