import { ParsedData } from '../../types/parseGithubUrl';
import axios from 'axios';
import defaultBranch from 'default-branch';

const FETCH_URL = (repoLink: string, branch: string) => {
  return `https://raw.githubusercontent.com/${repoLink}/${branch}/package.json`;
};

const getPackageJSON = async (
  repoLink: string,
  branch: string
): Promise<string> => {
  try {
    const { data } = await axios.get<string>(FETCH_URL(repoLink, branch));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return '';
    } else {
      return '';
    }
  }
};

async function parseGithubUrl(
  url: string,
  dependency: string
): Promise<ParsedData> {
  const splittedURL = url.split('/');
  splittedURL.splice(0, 3);
  const repoLink = splittedURL.join('/');

  const branch = await defaultBranch(url);
  const packageJson = await getPackageJSON(repoLink, branch);
  const repoVersion = JSON.parse(JSON.stringify(packageJson)).dependencies[
    dependency
  ];

  return { packageJson, repoVersion, branch };
}

export default parseGithubUrl;
