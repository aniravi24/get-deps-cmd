#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';
import { program } from 'commander';

const cleanVersionString = (v: string) => v.replace(/[^0-9.]/g, '');

const zipVersions = (dependencies: string[], versions: string[]): string =>
  dependencies
    .map((d: string, i: number) => `${d}@${cleanVersionString(versions[i])}`)
    .join(' ');

const parsePackage = ({
  npmOnly,
  yarnOnly,
  path: filePath,
  showVersions,
  prodOnly
}: {
  npmOnly: boolean;
  yarnOnly: boolean;
  path: string;
  showVersions: boolean;
  prodOnly: boolean;
}) => {
  const packageBuffer = fs.readFileSync(path.resolve(process.cwd(), filePath));

  const packageContent = JSON.parse(String(packageBuffer));

  const {
    dependencies: dependenciesObj = {},
    devDependencies: devDependenciesObj = {}
  } = packageContent;
  if (
    Object.keys(dependenciesObj).length == 0 &&
    Object.keys(devDependenciesObj).length == 0
  )
    return console.log(chalk.red('There are no packages!'));

  const dependencies = Object.keys(dependenciesObj);
  const dependenciesVersions = Object.values(dependenciesObj) as string[];

  const devDependencies = Object.keys(devDependenciesObj);
  const devDependenciesVersions = Object.values(devDependenciesObj) as string[];

  if (!npmOnly) {
    if (showVersions) {
      console.log(chalk.green('YARN DEPENDENCIES:\n'));
      console.log(
        `yarn add ${zipVersions(dependencies, dependenciesVersions)}\n`
      );
      if (!prodOnly) {
        console.log(chalk.blue('YARN DEV DEPENDENCIES:\n'));
        console.log(
          `yarn add -D ${zipVersions(
            devDependencies,
            devDependenciesVersions
          )}\n`
        );
      }
    } else {
      console.log(chalk.green('YARN DEPENDENCIES:\n'));
      console.log(`yarn add ${dependencies.join(' ')}\n`);
      if (!prodOnly) {
        console.log(chalk.blue('YARN DEV DEPENDENCIES:\n'));
        console.log(`yarn add -D ${devDependencies.join(' ')}\n`);
      }
    }
  }

  if (!yarnOnly) {
    if (showVersions) {
      console.log(chalk.green('NPM DEPENDENCIES:\n'));
      console.log(
        `npm install ${zipVersions(dependencies, dependenciesVersions)}\n`
      );
      if (!prodOnly) {
        console.log(chalk.blue('NPM DEV DEPENDENCIES:\n'));
        console.log(
          `npm install --save-dev ${zipVersions(
            devDependencies,
            devDependenciesVersions
          )}\n`
        );
      }
    } else {
      console.log(chalk.green('NPM DEPENDENCIES:\n'));
      console.log(`npm install ${dependencies.join(' ')}\n`);
      if (!prodOnly) {
        console.log(chalk.blue('NPM DEV DEPENDENCIES:\n'));
        console.log(`npm install --save-dev ${devDependencies.join(' ')}\n`);
      }
    }
  }
};

program
  .version(
    chalk.blue('version 1.0.0, built with love by aniravi24 and enaluz'),
    '-v, --version'
  )
  .requiredOption('-p, --path <file>', 'path to package.json')
  .option('-y, --yarn-only', 'only show yarn commands')
  .option('-n, --npm-only', 'only show npm commands')
  .option('-s, --show-versions', 'get exact versions for packages')
  .option('-r, --prod-only', 'get only dependencies and not dev dependencies')
  .action(args => {
    parsePackage(args);
  });
program.parse(process.argv);
