import {
  DefaultTableConfigData,
  DefaultTabledata,
  UpdateParamTableConfigData,
  UpdateParamTabledata,
} from '../../types/tableConfig';

import { TableUserConfig } from 'table';

const defaultTableConfig = (): DefaultTableConfigData => {
  const data: DefaultTabledata = [
    ['Name', 'Repo', 'Version', 'version_satisfied'],
  ];
  const config: TableUserConfig = {
    columnDefault: {
      width: 30,
    },
    columns: [
      { alignment: 'center' },
      { alignment: 'left' },
      { alignment: 'center' },
      { alignment: 'center' },
    ],
  };

  return { data, config };
};

const updateParamTableConfig = (): UpdateParamTableConfigData => {
  const data: UpdateParamTabledata = [
    ['Name', 'Repo', 'Version', 'version_satisfied', 'update_pr'],
  ];
  const config: TableUserConfig = {
    columnDefault: {
      width: 30,
    },
    columns: [
      { alignment: 'center' },
      { alignment: 'left' },
      { alignment: 'center' },
      { alignment: 'center' },
      { alignment: 'center' },
    ],
  };

  return { data, config };
};

export { defaultTableConfig, updateParamTableConfig };
