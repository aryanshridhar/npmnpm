import {
  Config,
  adjectives,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

const branchName: string = 'branch-' + uniqueNamesGenerator(customConfig);

export default branchName;
