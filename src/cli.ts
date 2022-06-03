import * as figlet from 'figlet';
import * as packageJson from '../package.json';

import { green, red } from 'chalk';

import { Command } from 'commander';
import handleAnalyze from './common/analyze';
import handleToken from './common/token';
import { optionalParams } from '../types/cli';

const version: string = packageJson.version;

const program = new Command();

program
  .name('npmnpm')
  .description('CLI to some JavaScript string utilities')
  .version(version);

program.addHelpText(
  'beforeAll',
  green(
    figlet.textSync('npmnpm', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })
  )
);

program
  .command('register <token>')
  .description("Registers the user's Github access token")
  .action(async function (token: string) {
    const isValid = await handleToken(token);
    if (!isValid) {
      console.log(red('The given token is not valid'));
    }
    console.log(green('Successfully registered PAT!'));
  });

program
  .arguments('<file> <dependency>')
  .description('Scans through the given csv file for the dependency passed')
  .option(
    '-l, --latest',
    'Scans with the latest version of the package specified'
  )
  .option('-u, --update', 'Create pull request for the outdated dependencies')

  .action(async function (
    file: string,
    dependency: string,
    args: optionalParams
  ) {
    await handleAnalyze(file, dependency, args);
  });

program.parse(process.argv);
