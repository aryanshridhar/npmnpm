import * as Base64 from 'js-base64';

import { Octokit } from '@octokit/rest';
import { PullRequestParams } from '../../types/createPullRequest';
import branchName from './branchName';
import updatePackageJSON from './updateFile';

const createPullRequest = async (args: PullRequestParams): Promise<string> => {
  const octokit = new Octokit({
    auth: args.token,
  });

  const packageJSON = updatePackageJSON({
    packageJson: args.packageJson,
    dependency: args.dependencyName,
    version: args.version,
  });

  const contentEncoded = Base64.encode(packageJSON);

  const userData = await octokit.request('GET /user', {});
  const emailData = await octokit.request('GET /user/emails', {});

  const name = userData.data.name;
  const email = emailData.data.filter(data => data.primary === true)[0].email;

  if (name === null) {
    return '';
  }

  const mainRef = await octokit.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    {
      owner: args.repoOwner,
      repo: args.repo,
      ref: `heads/${args.defaultBranch}`,
    }
  );

  const {
    data: { sha },
  } = await octokit.request('GET /repos/{owner}/{repo}/contents/{file_path}', {
    owner: args.repoOwner,
    repo: args.repo,
    file_path: 'package.json',
  });

  await octokit.rest.git.createRef({
    owner: args.repoOwner,
    repo: args.repo,
    ref: `refs/heads/${branchName}`,
    sha: mainRef.data.object.sha,
  });

  await octokit.repos.createOrUpdateFileContents({
    // replace the owner and email with your own details
    owner: args.repoOwner,
    repo: args.repo,
    path: 'package.json',
    message: `Bump ${args.dependencyName} to ${args.version}`,
    sha: sha,
    branch: branchName,
    content: contentEncoded,
    committer: {
      name,
      email,
    },
  });

  const prDetails = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner: args.repoOwner,
    repo: args.repo,
    title: `Bump ${args.dependencyName} to ${args.version}`,
    body: `Bump ${args.dependencyName} to ${args.version}`,
    head: branchName,
    base: args.defaultBranch,
  });

  if (prDetails.status === 201) {
    return prDetails.data.url;
  }

  return '';
};

export default createPullRequest;
