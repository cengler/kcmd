#! /usr/bin/env node
const { program, commander } = require('commander')
const kadd = require('./commands/kadd')
const klist = require('./commands/klist')
const kselect = require('./commands/kselect')
const ktopics = require('./commands/ktopics')
const kshow = require('./commands/kshow')

program
  .command('klist')
  .description('List all kafka servers')
  .action(klist)

program
  .command('kshow')
  .description('Show selected')
  .action(kshow)

program
  .command('kadd <name> <brokers>')
  .description('Add a kafka servers')
  .action(kadd)

program
  .command('kselect <type>')
  .description('Select a kafka server')
  .action(kselect)

program
  .command('ktopics')
  .description('List all topics of selected kafka')
  .action(ktopics)

program.parse()
