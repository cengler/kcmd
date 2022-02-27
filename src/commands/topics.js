import config from './../services/config'
import chalk from 'chalk'
import kafka from './../services/kafka'

async function topics () {
  const select = config.getSelected()
  if (!select || !select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else {
    kafka.topics(select.kafka.brokers)
      .then(ts => {
        ts.forEach((t, index) => {
          console.log(
            chalk.yellowBright(`${index}. ${t}`)
          )
        })
      })
  }
}

async function topic () {
  const select = config.getSelected()
  if (!select || !select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if(!select.topic){
    console.log(
      chalk.red.bold('You don\'t have a kafka topic selected yet.')
    )
  } else {
    console.log('aca')
    kafka.topicMetadata(select.kafka.brokers, select.topic)
      .then(m => {
        console.table(m)
      })
  }
}

module.exports = {
  topics,
  topic
}
