import { updateFileParams } from '../../types/updateFile';

const updatePackageJSON = (args: updateFileParams): string => {
  const parsedPackageJSON = JSON.parse(JSON.stringify(args.packageJson));
  parsedPackageJSON.dependencies[args.dependency] = `^${args.version}`;

  return JSON.stringify(parsedPackageJSON);
};

export default updatePackageJSON;
