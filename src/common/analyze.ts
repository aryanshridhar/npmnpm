import * as path from 'path';

import { defaultTableConfig, updateParamTableConfig } from './tableConfig';
import { green, red } from 'chalk';
import { gte, valid } from 'semver';

import createPullRequest from './createPullRequest';
import getVersion from './fetchVersion';
import { optionalParams } from '../../types/cli';
import ora from 'ora';
import parseGithubUrl from './parseGithubUrl';
import readCSV from './readCSV';
import store from './store';
import { table } from 'table';
import { updateConfigParam } from '../../types/analyze';

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

  if (isUpdateParam) {
    await handleUpdateParam({
      csvData,
      dependencyName,
      spinner,
      userVersion,
    });

    return;
  }

  const { data, config } = defaultTableConfig();
  for (const columns of csvData) {
    const name = columns.name;
    const repoLink = columns.repo;

    const { repoVersion } = await parseGithubUrl(repoLink, dependencyName);
    if (repoVersion === undefined) {
      console.log(red('\nDependency not available in listed repository!'));
      spinner.stop();
      return;
    }

    const parsedVersion = repoVersion.substring(1);
    if (
      checkForValidVersion(parsedVersion, () => {
        console.log(red('\nInvalid dependency version listed!'));
        spinner.stop();
      }) === false
    ) {
      return;
    }

    const isGreaterVersion = gte(parsedVersion, userVersion);

    data.push([
      name,
      repoLink,
      parsedVersion,
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

const handleUpdateParam = async (args: updateConfigParam) => {
  const { data, config } = updateParamTableConfig();
  const token = store.get('token');

  if (token === undefined || token === null) {
    console.log(
      red('Token is not registered!\nUse --help to view allowed commands')
    );
  }
  for (const columns of args.csvData) {
    const name = columns.name;
    const repoLink = columns.repo;
    const splittedURL = repoLink.split('/');
    const { packageJson, repoVersion, branch } = await parseGithubUrl(
      repoLink,
      args.dependencyName
    );

    if (repoVersion === undefined) {
      console.log(red('\nDependency not available in listed repository!'));
      args.spinner.stop();
      return;
    }

    const parsedVersion = repoVersion.substring(1);
    let prUrl = '';

    if (
      checkForValidVersion(parsedVersion, () => {
        console.log(red('\nUnkown dependency version listed!'));
        args.spinner.stop();
      }) === false
    ) {
      return;
    }

    const isGreaterVersion = gte(parsedVersion, args.userVersion);

    if (!isGreaterVersion) {
      // Need for the pull request to update the dependency.
      prUrl = await createPullRequest({
        packageJson,
        token,
        repoOwner: splittedURL[3],
        repo: splittedURL[4],
        dependencyName: args.dependencyName,
        version: args.userVersion,
        defaultBranch: branch,
      });
    }

    data.push([
      name,
      repoLink,
      parsedVersion,
      isGreaterVersion === true
        ? green(isGreaterVersion)
        : red(isGreaterVersion),
      prUrl,
    ]);
  }

  args.spinner.stop();

  console.log(table(data, config));
};

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

export default handleAnalyze;
