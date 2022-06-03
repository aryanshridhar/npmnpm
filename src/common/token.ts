import { Octokit } from '@octokit/rest';
import store from './store';

const handleToken = async (token: string): Promise<boolean> => {
  if (await validateToken(token)) {
    store.set('token', token);
    return true;
  }

  return false;
};

const validateToken = async (token: string): Promise<boolean> => {
  const octokit = new Octokit({
    auth: token,
  });

  // Sample user request to check if the token is correct or not.
  const userData = await octokit.request('GET /user', {});
  if (userData.status != 200) {
    return false;
  }

  return true;
};

export default handleToken;
