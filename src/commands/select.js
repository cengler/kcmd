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
  if (choices.length && field && startElement) {
    question.default = _.findIndex(choices, [field, startElement[field]])
  } else if (choices.length && startElement) {
    question.default = startElement
  }
  return inquirer.prompt([question]).then(a => a.value)
}

function selectServer() {
  let kafkaList = config.getKafkaList()
  let server = config.getKafka()
  selectOne(kafkaList, server, 'Select server', 'name')
    .then(server => {
      const idx = _.findIndex(kafkaList, ['name', server]);
      const s = kafkaList[idx]
      config.setKafka(s)
      console.log(
        chalk.green.bold(`Kafka server [${s.name}] has been setted successfully!`)
      )
    })
}

function selectTopic() {
  let selected = config.getSelected()
  if (!selected || !selected.kafka) {
    console.log(
      chalk.yellow.bold(`No Kafka server selected`)
    )
  } else {
    kafka.topics(selected.kafka.brokers)
      .then(ts => {
        selectOne(ts, selected.topic, 'Select topic')
          .then(topic => {
            config.setTopic(topic)
          })

      })
  }
}

function selectGroup() {
  let selected = config.getSelected()
  if (!selected || !selected.kafka) {
    console.log(
      chalk.yellow.bold(`No Kafka server selected`)
    )
  } else {
    kafka.groups(selected.kafka.brokers)
      .then(ts => {
        ts = ts.map(t => t.groupId)
        selectOne(ts, selected.group, 'Select group')
          .then(group => {
            config.setGroup(group)
          })
      })
  }
}

function select() {
  selectOne(['kafka', 'topic', 'group'], 'kafka', 'Which?')
    .then(answer => {
      switch (answer) {
        case 'kafka':
          selectServer()
          break;
        case 'topic':
          selectTopic()
          break;
        default:
          selectGroup()
      }
    })
}

module.exports = select
