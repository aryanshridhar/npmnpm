export interface PullRequestParams {
  packageJson: string;
  token: string;
  repoOwner: string;
  repo: string;
  dependencyName: string;
  version: string;
  defaultBranch: string;
}
