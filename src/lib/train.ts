export interface DelayTrain {
  name: string;
  company: string;
  lastupdate_gmt: number;
  source: string;
}

const fetchDelayTrains = (): DelayTrain[] => {
  const TETSUDO_ENDPOINT = 'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json';
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

const mapToRow = (nameColumn: string[][], trainColumn: string[][]): User[] | [] =>
  nameColumn.map((name, index) => {
    const targetTrains = trainColumn[index] ? trainColumn[index][0] : null;
    return { name: name[0], trains: trainStrToObject(targetTrains) };
  });

const foundTrains = (train, delayTrains) => {
  const trains = [];
  for (const delayTrain of delayTrains) {
    if (delayTrain.name === train.name && delayTrain.company === train.company) {
      trains.push(delayTrain);
    }
  }
  return trains;
};

const pickDelayTrains = (delayTrains: Train[], { trains }: User): Train[] | [] => {
  let results = [];
  // array.find not working
  trains.forEach(train => results = foundTrains(train, delayTrains));
  return results;
};
