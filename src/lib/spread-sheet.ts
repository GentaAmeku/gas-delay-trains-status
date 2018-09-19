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
