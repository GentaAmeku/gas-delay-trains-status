const fetchSpreadSheet = ({ id, sheetName }: { id: string; sheetName: string }) =>
  SpreadsheetApp.openById(id).getSheetByName(sheetName);

const mapToRow = (nameColumn: string[][], trainColumn: string[][]): User[] | [] =>
  _.map(nameColumn, (name, index) => {
    const targetTrains = trainColumn[index] ? trainColumn[index][0] : null;
    return { name: name[0], trains: trainStrToObject(targetTrains) };
  });

const createUsersFromSpreadSheet = (spreadsheet): User[] => {
  const nameColumn = spreadsheet.getRange(2, 1, spreadsheet.getLastRow() - 1).getValues();
  const trainColumn = spreadsheet.getRange(2, 2, spreadsheet.getLastRow() - 1).getValues();
  return mapToRow(nameColumn, trainColumn);
};
