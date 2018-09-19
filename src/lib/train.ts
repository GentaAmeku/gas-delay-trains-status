export interface DelayTrain {
  name: string;
  company: string;
  lastupdate_gmt: number;
  source: string;
}

const fetchDelayTrains = (): DelayTrain[] => {
  const TETSUDO_ENDPOINT =
    'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json';
  return JSON.parse(UrlFetchApp.fetch(TETSUDO_ENDPOINT).getContentText());
};

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

const pickDelayTrains = (
  delayTrains: Train[] = [],
  { trains }: User,
): Train[] | [] => {
  const results = [];
  trains.forEach(train => {
    const foundTrains = delayTrains.find(
      delayTrain =>
        delayTrain.name === train.name && delayTrain.company === train.company,
    );
    results.push(foundTrains);
  });
  return results;
};
