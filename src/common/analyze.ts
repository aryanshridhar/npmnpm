import * as path from 'path';

import { config, data } from './display';
import { green, red } from 'chalk';
import { gte, valid } from 'semver';

import getVersion from './fetch';
import { optionalParams } from '../../types/cli';
import ora from 'ora';
import parseGithubUrl from './parseGithubUrl';
import readCSV from './read';
import { table } from 'table';

const handleAnalyze = async (
  file: string,
  dependency: string,
  args: optionalParams
): Promise<void> => {
  const isUpdateParam = args.update;
  const isLatestParam = args.latest;

  const [dependencyName, version] = dependency.split('@');
  const spinner: ora.Ora = ora(
    `Checking for versions of dependency -  ${green(dependencyName)}...`
  );
  spinner.start();

  if (
    checkForValidVersion(version, () => {
      console.log(red('\nSpecified version is invalid!'));
      spinner.stop();
    }) === false
  ) {
    return;
  }

  const userVersion = await getUserVersion(
    dependencyName,
    version,
    isLatestParam
  );

  if (
    checkForValidVersion(userVersion, () => {
      console.log(red('Unkown dependency passed!'));
      spinner.stop();
    }) === false
  ) {
    return;
  }

  const csvData = await readCSV(path.resolve(file));

  for (const columns of csvData) {
    const name = columns.name;
    const repoLink = columns.repo;

    const repoVersion = await parseGithubUrl(repoLink, dependencyName);
    if (
      checkForValidVersion(repoVersion, () => {
        console.log(red('\nDependency not available in listed repository!'));
        spinner.stop();
      }) === false
    ) {
      return;
    }

    const isGreaterVersion = gte(repoVersion, userVersion);

    data.push([
      name,
      repoLink,
      repoVersion,
      isGreaterVersion === true
        ? green(isGreaterVersion)
        : red(isGreaterVersion),
    ]);
  }

  spinner.stop();

  console.log(table(data, config));
};

const getUserVersion = async (
  dependencyName: string,
  version: string,
  isLatestParam: boolean | undefined
): Promise<string> => {
  if (isLatestParam) {
    const actualdependencyVersion = await getVersion(dependencyName);
    if (!valid(actualdependencyVersion)) {
      return '-1.-1.-1';
    }
    return actualdependencyVersion;
  }

  return version;
};

export default handleAnalyze;

const checkForValidVersion = (
  version: string,
  callback: () => void
): boolean => {
  if (!valid(version)) {
    callback();
    return false;
  }

  return true;
};
