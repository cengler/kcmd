import config from './../services/config'
import chalk from 'chalk'
import _ from 'lodash'
import inquirer from 'inquirer'
import kafka from './../services/kafka'

const selectOne = (choices, startElement, message, field = null) => {
  const question = {
    type: 'list',
    name: 'value',
    message,
    choices,
  }
  if(field && startElement) question.default = _.findIndex(choices, [field, startElement[field]])
  else if (startElement) question.default = _.findIndex(choices, startElement)
  return inquirer.prompt([question]).then(a => a.value)
}

function kselectServer () {
  let kafkaList = config.getKafkaList()
  let server = config.getKafka()
  selectOne(kafkaList, server, 'Select server', 'name')
    .then(server => {
      console.log('sss', server)
      const idx = _.findIndex(kafkaList, ['name', server]);
      const s = kafkaList[idx]
      config.setKafka(s)
      console.log(
        chalk.green.bold(`Kafka server [${s.name}] has been setted successfully!`)
      )
    })
}

function kselectTopic () {
  let server = config.getKafka()
  if(!server) {
    console.log(
      chalk.yellow.bold(`No Kafka server selected`)
    )
  } else {
    kafka.topics(server.brokers)
      .then(ts => {
        selectOne(ts, server.topic, 'Select topic')
          .then(topic => {
            config.setTopic(topic)
          })

      })
  }
}

function kselectGroup () {
  let server = config.getKafka()
  if(!server) {
    console.log(
      chalk.yellow.bold(`No Kafka server selected`)
    )
  } else {
    kafka.groups(server.brokers)
      .then(ts => {
        ts = ts.map(t => t.name = t.groupId)
        selectOne(ts, server.group, 'Select group', 'name')
          .then(group => {
            config.setGroup(group)
          })
      })
  }
}

function select (type) {
  if(type === 'kafka')
    kselectServer()
  else if(type === 'topic')
    kselectTopic()
  else if(type === 'group')
    kselectGroup()
  else {
    console.log(
      chalk.red.bold(`No type!!!`)
    )
  }
}

module.exports = select
