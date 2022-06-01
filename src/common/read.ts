import { CSVData } from '../../types/read';
/* eslint-disable @typescript-eslint/no-unsafe-return */
import csv from 'csvtojson';

const readCSV = async (file: string): Promise<CSVData[]> => {
  if (!file.endsWith('.csv')) {
    return [
      {
        name: '',
        repo: '',
      },
    ];
  }
  const JSONData = await csv().fromFile(file);
  return JSON.parse(JSON.stringify(JSONData));
};

export default readCSV;
