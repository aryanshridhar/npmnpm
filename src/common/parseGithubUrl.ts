import { Data } from '../../types/parseGithubUrl';
import axios from 'axios';
import defaultBranch from 'default-branch';

const FETCH_URL = (repoLink: string, branch: string) => {
  return `https://raw.githubusercontent.com/${repoLink}/${branch}/package.json`;
};

const getVersion = async (
  repoLink: string,
  branch: string,
  dependency: string
): Promise<string> => {
  try {
    const { data } = await axios.get<Data>(FETCH_URL(repoLink, branch));
    const version = data.dependencies[dependency];
    return version.substring(1);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return '-1.-1.-1';
    } else {
      return '-1.-1.-1';
    }
  }
};

async function parseGithubUrl(
  url: string,
  dependency: string
): Promise<string> {
  const splittedURL = url.split('/');
  splittedURL.splice(0, 3);
  const repoLink = splittedURL.join('/');

  const branch = await defaultBranch(url);
  const version = await getVersion(repoLink, branch, dependency);

  return version;
}

export default parseGithubUrl;
