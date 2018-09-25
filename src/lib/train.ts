const fetchDelayTrains = (): DelayTrain[] =>
  JSON.parse(UrlFetchApp.fetch('https://rti-giken.jp/fhc/api/train_tetsudo/delay.json').getContentText());

const trainStrToObject = (trainNames: string): Train[] => {
  if (typeof trainNames !== 'string') {
    return [];
  }
  const trainsArray: string[] = trainNames.split(',');
  _.map(trainsArray, trainInfo => {
    const name = trainInfo.slice(0, trainInfo.indexOf('/'));
    const company = trainInfo.slice(trainInfo.indexOf('/') + 1);
    return { name, company };
  });
};

const mapToRow = (nameColumn: string[][], trainColumn: string[][]): User[] | [] =>
  _.map(nameColumn, (name, index) => {
    const targetTrains = trainColumn[index] ? trainColumn[index][0] : null;
    return { name: name[0], trains: trainStrToObject(targetTrains) };
  });

const pickDelayTrains = (delayTrains: Train[], { trains }: User): Train[] | [] =>
  _.map(delayTrains, delayTrain =>
    _.find(trains, train => delayTrain.name === train.name && delayTrain.company === train.company),
  );
