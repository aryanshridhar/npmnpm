import { TableUserConfig } from 'table';

export type DefaultTabledata = [[string, string, string, string]];
export type UpdateParamTabledata = [[string, string, string, string, string]];

export interface DefaultTableConfigData {
  data: DefaultTabledata;
  config: TableUserConfig;
}

export interface UpdateParamTableConfigData {
  data: UpdateParamTabledata;
  config: TableUserConfig;
}
