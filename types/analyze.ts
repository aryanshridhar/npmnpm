import { CSVData } from './readCSV';
import ora from 'ora';

export interface updateConfigParam {
  csvData: CSVData[];
  dependencyName: string;
  spinner: ora.Ora;
  userVersion: string;
}
