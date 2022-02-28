import config from './../services/config'
import chalk from 'chalk'
import display from './../util/display'

function add(name, brokers) {
  config.addKafka({
    name,
    brokers
  })
  console.log(
    chalk.green.bold('Kafka has been added successfully!')
  )
}

function clusters() {
  const kafkaList = config.getKafkaList()
  if (kafkaList && kafkaList.length) {
    display.print(kafkaList)
  } else {
    console.log(
      chalk.red.bold('You don\'t have a kafka yet.')
    )
  }
}

module.exports = {
  add,
  clusters
}
