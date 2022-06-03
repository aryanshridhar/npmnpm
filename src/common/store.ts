import * as os from 'os';

import { Store } from 'data-store';

const store = new Store({
  home: os.homedir(),
  base: '.config/npmnpm',
  name: 'pat',
});

export default store;
