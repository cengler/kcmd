const conf = new (require('conf'))()
const chalk = require('chalk')
const _ = require('lodash')
const inquirer = require('inquirer');

const askServer = (server, servers) => {
const questions = [
    {
    type: 'list',
    name: 'server',
    message: 'Select the kafka server',
    choices: servers,
    default: _.findIndex(servers, ['name', server.name])
    }
];
return inquirer.prompt(questions);
}

  

function kselect () {
    let kafkaList = conf.get('kafka-list')
    let server = conf.get('kafka-server')
    askServer(server, kafkaList)
        .then(r => {
            const idx = _.findIndex(kafkaList, ['name', r.server]);
            const s = kafkaList[idx]
            conf.set('kafka-server', s)
            console.log(
                chalk.green.bold(`Kafka server [${s.name}] has been setted successfully!`)
            )
    })
}

module.exports = kselect