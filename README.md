# get-deps-cmd

Read a package.json and get the commands to install all dependencies for yarn and/or npm.

## Installation

Yarn:
`yarn add global get-deps-cmd`

NPM:
`npm install -g get-deps-cmd`

## Usage

```
Options:
  -v, --version        output the version number
  -p, --path <file>    path to package.json
  -y, --yarn-only      only show yarn commands
  -n, --npm-only       only show npm commands
  -s, --show-versions  get exact versions for packages
  -r, --prod-only      get only dependencies and not dev dependencies
  -h, --help           display help for command
```

## Example

running `get-deps-cmd` in a directory containing a package.json file will output the following:

```
YARN DEPENDENCIES:

yarn add commander

YARN DEV DEPENDENCIES:

yarn add -D @commitlint/cli @commitlint/config-conventional @typescript-eslint/eslint-plugin @typescript-eslint/parser commitizen cz-conventional-changelog eslint eslint-config-prettier eslint-plugin-prettier husky lint-staged organize-imports-cli prettier pretty-quick standard-version typescript

NPM DEPENDENCIES:

npm install commander

NPM DEV DEPENDENCIES:

npm install --save-dev @commitlint/cli @commitlint/config-conventional @typescript-eslint/eslint-plugin @typescript-eslint/parser commitizen cz-conventional-changelog eslint eslint-config-prettier eslint-plugin-prettier husky lint-staged organize-imports-cli prettier pretty-quick standard-version typescript
```

## Contributors

Built by @aniravi24 and @enaluz.
