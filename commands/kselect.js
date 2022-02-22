const conf = new (require('conf'))()
const chalk = require('chalk')
const _ = require('lodash')
const inquirer = require('inquirer');
const kafka = require('./../services/kafka');

const selectOne = (choices, startElement, message, field = null) => {
  const question = {
    type: 'list',
    name: 'value',
    message,
    choices,
  }
  if(field) question.default = _.findIndex(choices, ['field', startElement[field]])
  else question.default = _.findIndex(choices, startElement)
  return inquirer.prompt([question]).then(a => a.value)
}


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



function kselectServer () {
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

function kselectTopic () {
  let server = conf.get('kafka-server')
  if(!server) {
    console.log(
      chalk.yellow.bold(`No Kafka server selected`)
    )
  } else {
    kafka.topics(server.brokers)
      .then(ts => {
        selectOne(ts, server.topic, 'Select topic')
          .then(topic => {
            server.topic = topic
            conf.set('kafka-server', server)
          })

      })
  }

}

function kselect (type) {
  if(type === 'kafka')
    kselectServer()
  else if(type === 'topic')
    kselectTopic()
  else {
    console.log(
      chalk.red.bold(`No type!!!`)
    )
  }

}

module.exports = kselect
