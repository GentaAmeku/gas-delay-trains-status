const trainStrToObject = (trainNames: string): Train[] => {
  if (typeof trainNames !== 'string') {
    return [];
  }
  const trainsArray: string[] = trainNames.split(',');
  return trainsArray.map((trainInfo) => {
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

// const pickTrains = (delayTrains: DelayTrain[] = [], user: User) => {
//   user.trains.forEach(train => {
//     const hoge = delayTrains.find(delayTrain => {
//       return (delayTrain.name === targetTrainName && delayTrain.company === targetTrainCompany);
//     })
//   });
// };

const fetchSpreadSheet = () => {
  const SPREADSHEETID = '1JiaOSinQSYaQLJkNsFuMHP98xMbMPdMG15eU-S4ynpU';
  const SHEETNAME = 'register';
  return SpreadsheetApp.openById(SPREADSHEETID).getSheetByName(SHEETNAME);
};

const parseSpreadSheetToArray = (spreadsheet): User[] => {
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
  const spreadSheet = fetchSpreadSheet();
  const users = parseSpreadSheetToArray(spreadSheet);
}
