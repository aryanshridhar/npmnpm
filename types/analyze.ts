import { CSVData } from './read';
import ora from 'ora';

export interface updateConfigParam {
  csvData: CSVData[];
  dependencyName: string;
  spinner: ora.Ora;
  userVersion: string;
}
