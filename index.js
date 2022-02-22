#! /usr/bin/env node
const { program } = require('commander')
const kadd = require('./commands/kadd')
const klist = require('./commands/klist')
const kselect = require('./commands/kselect')
const ktopics = require('./commands/ktopics')

program
    .command('klist')
    .description('List all kafka servers')
    .action(klist)
    
program
    .command('kadd <name> <servers>')
    .description('Add a kafka servers')
    .action(kadd)

program
    .command('kselect')
    .description('Select a kafka server')
    .action(kselect)

program
    .command('ktopics')
    .description('List all topics of selected kafka')
    .action(ktopics)

program.parse()