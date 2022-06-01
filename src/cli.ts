import * as packageJson from '../package.json';

import { Command } from 'commander';
import handleAnalyze from './common/analyze';
import { optionalParams } from '../types/cli';

const version: string = packageJson.version;

const program = new Command();

program
  .name('dyte-dependency-analyzer')
  .description('CLI to some JavaScript string utilities')
  .version(version);

program
  .arguments('<file> <dependency>') // sub-command name
  .alias('a') // alternative sub-command is `al`
  .description('Scans through the given csv file for the dependency passed') // command description
  .option(
    '-l, --latest',
    'Scans with the latest version of the package specified'
  )
  .option('-u, --update', 'Create pull request for the outdated dependencies')

  // function to execute when command is uses
  .action(async function (
    file: string,
    dependency: string,
    args: optionalParams
  ) {
    await handleAnalyze(file, dependency, args);
  });

program.parse(process.argv);
