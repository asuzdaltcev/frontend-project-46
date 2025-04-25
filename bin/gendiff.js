#!/usr/bin/env node

import { Command } from 'commander'
import { createRequire } from 'module'
import { genDiff } from '../src/index.js'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(pkg.version)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    try {
      console.log(genDiff(filepath1, filepath2, options.format))
    }
    catch (error) {
      console.error(`Ошибка: ${error.message}`)
      process.exit(1)
    }
  })
  .parse(process.argv)
