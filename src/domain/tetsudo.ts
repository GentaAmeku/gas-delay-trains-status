const TETSUDO_ENDPOINT = 'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json';

export interface DelayTrain {
  name: string;
  company: string;
  lastupdate_gmt: number;
  source: string;
}

const fetchDelayTrains = (): DelayTrain[] => {
  const response = UrlFetchApp.fetch(TETSUDO_ENDPOINT);
  return JSON.parse(response.getContentText('UTF-8'));
};
