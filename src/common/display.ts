import { TableUserConfig } from 'table';
import { Tabledata } from '../../types/display';

const data: Tabledata = [['Name', 'Repo', 'Version', 'version_satisfied']];

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

export { data, config };
