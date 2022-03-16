#! /usr/bin/env node
import {program} from 'commander'
import show from './commands/show'
import set from './commands/set'
import ls from './commands/ls'
import consumer from './commands/consumer'
import deleteCluster from './commands/deleteCluster'
import metadata from './commands/metadata'
import putCluster from './commands/putCluster'
import updateConfig from './commands/config'
import offsets from './commands/offsets'
import inquirer from 'inquirer'
import inquirerPrompt from 'inquirer-autocomplete-prompt'
import display from './util/display'
const packageJson = require('./../package.json')

inquirer.registerPrompt('autocomplete', inquirerPrompt)

const p = program

program
  .name(`kcmd`)
  .version(packageJson.version, '-v, --version', 'output the current version')
  .option('-t, --topic <topic>', 'override selected topic')
  .on('option:topic', function () {
    process.env.TOPIC = p.opts().topic
  })
  .option('-g, --group <group>', 'override selected group')
  .on('option:group', function () {
    process.env.GROUP = p.opts().group
  })
  .option('-c, --cluster <name>', 'override selected cluster by name')
  .on('option:cluster', function () {
    process.env.CLUSTER = p.opts().cluster
  })
  .option('--verbose', 'verbose logs')
  .on('option:verbose', function () {
    process.env.VERBOSE = p.opts().verbose
  })

program
  .command('ls <type>')
  .description('List clusters/brokers/topics/groups/groupsByTopic/topicsByGroup')
  .action(ls)

program
  .command('set <type> [value]')
  .description('Set a kafka cluster/topic/group')
  .action(set)

program
  .command('put <name> <brokers>')
  .description('Add/Replace a kafka cluster by name')
  .action(putCluster)

program
  .command('delete <name>')
  .description('Delete a kafka cluster by name')
  .action(deleteCluster)

program
  .command('offsets <type>')
  .description('Get topic/group offsets and lag')
  .action(offsets)

program
  .command('consumer')
  .description('Consume messages of selected topic')
  .action(consumer)

program
  .command('show [section]')
  .description('Show selected options clusters/config/selected')
  .action(show)

program
  .command('config')
  .description('Update config')
  .action(updateConfig)

program
  .command('metadata <type>')
  .description('Get metadata of topic/groups')
  .action(metadata)


display.showBanner()
program.parse()
