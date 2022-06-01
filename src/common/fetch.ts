import { Data } from '../../types/fetch';
import axios from 'axios';

const FETCH_URL = (name: string) =>
  `https://registry.npmjs.com/-/v1/search?text=${name}&size=1`;

const getQueryURL = (dependency: string): string => {
  const parsedName = dependency.split(' ').join('+');
  console.log(FETCH_URL(parsedName));
  return FETCH_URL(parsedName);
};

const getVersion = async (dependency: string): Promise<string> => {
  try {
    const { data } = await axios.get<Data>(getQueryURL(dependency));
    return data.objects[0].package.version;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return '-1.-1.-1';
    } else {
      return '-1.-1.-1';
    }
  }
};

export default getVersion;
