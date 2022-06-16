# npmnpm

A quick CLI tool to look out for outdated packages within your Node project and update them if required!

Developed in a <strong>single</strong> day!
## Installation

The package is already pushed to npm registry (https://www.npmjs.com/package/@aryanshridhar/npmnpm), to use it one can simply install it globally by - 
```
npm install -g @aryanshridhar/npmnpm
```

To verify installation - 

* Restart your terminal.
* Run
``` 
npmnpm --help 

```
This should successfully list out the available commands.


![Screenshot 2022-06-03 at 6 14 01 PM](https://user-images.githubusercontent.com/53977614/171856213-73f191f2-0b80-4126-9bc1-05e6b0545fee.png)


## Building

### Requirements

This package strictly requires a node version `>=12.0.0`. Use `node -v` to check the version of node installed. If the version is older than `12.0.0`, update your node to the latest version (preferable) - [docs](https://nodejs.org/en/download/).

### Steps
In order to build locally, one can follow these steps - 

* Clone the repository with - 
```
git clone https://github.com/dyte-submissions/dyte-vit-2022-aryanshridhar.git
```

* Move into the directory created - 

```
cd dyte-vit-2022-aryanshridhar/
```

* Install the dependencies listed in `package.json` file - 

```
npm install
```

* To compile and build the project written in typescript, run - 

```
npm run build
```

* This should successfully create a build folder with name `/lib` in the root directory having the entrypoint file `src/index.js`.
* To test it locally - 

```
node bin/index.js --help
```

This should list out the standard help command similar to the image shown above.

## CLI Commands

`npmnpm` comes with the following commands with options and arguments - 

### npmnpm

Lists out the name of repository and version in a tabular format. Make sure that the csv file is valid and is in path.
Sample csv file is listed in examples below.

<b>Usage:</b> 
```
npmnpm <file> <dependency_name@version>
```

If one wants to only use the latest version, then - 

```
npmnpm <file> <dependency_name> --latest
```

If one wants to create pull request to update the dependency with the version passed (or latest if not passed) - 

```
npmnpm <file> <dependency_name@version> --update
```

### register

Registers and stores the user's Gitub PAT (Perssonal access token).<br>
This command is necessary when passed an `--update` flag to create pull request updating the dependency otherwise it prompts the user to do so.

<b>Usage:</b> 
```
npmnpm register <your_access_token_here>
```

### Examples

#### Sample CSV File - 

```
name,repo
dyte-react-sample-app,https://github.com/dyte-in/react-sample-app/
dyte-js-sample-app,https://github.com/dyte-in/javascript-sample-app/
dyte-sample-app-backend,https://github.com/dyte-in/backend-sample-app/
```

#### npmnpm

npmnpm input.csv axios@0.23.0


<details>
<summary>Example</summary>

 https://user-images.githubusercontent.com/53977614/171873726-dfd42ce0-0861-45d2-b237-e5625efe62d0.mov

  
</details>

npmnpm input.csv axios --latest




<details>
<summary>Example</summary>

https://user-images.githubusercontent.com/53977614/171873730-3782161c-7e6a-4158-b509-4abd3d662469.mov
  
</details>


npmnpm input.csv react@18.0.1 --update




<details>
<summary>Example</summary>

https://user-images.githubusercontent.com/53977614/171873730-3782161c-7e6a-4158-b509-4abd3d662469.mov

 
(The created pull request can be seen [here](https://github.com/aryanshridhar/ReactNative-Weather-App/pull/28)!)

</details>

#### register


npmnpm register <your_access_token>


<details open>
<summary>Example</summary>


https://user-images.githubusercontent.com/53977614/171874745-463fc4eb-c606-4c61-941b-abe2d494993b.mov

(Don't worry! I have deleted that PAT now!)

</details>
