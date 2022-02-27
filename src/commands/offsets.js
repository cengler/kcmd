const config = require('./../services/config')
const chalk = require('chalk')
const kafka = require('./../services/kafka');

async function offsetsTopic () {
  const select = config.getSelected()
  if (!select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if(!select.topic){
    console.log(
      chalk.red.bold('You don\'t have a kafka topic selected yet.')
    )
  } else {
    kafka.offsets(select.kafka.brokers, select.topic)
      .then(os => {
        console.table(os)
        os.forEach((o, index) => {
          console.log(
            chalk.yellowBright(`${index}. ${JSON.stringify(o)}`)
          )
        })
      })
  }
}

async function offsetsGroup () {
  const select = conf.get('select')
  if (!select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if(!select.group){
    console.log(
      chalk.red.bold('You don\'t have a kafka group selected yet.')
    )
  } else {
    kafka.groupOffsets(select.kafka.brokers, select.group)
      .then(os => {
        os.forEach((o, index) => {
          console.log(
            chalk.yellowBright(`${index}. ${JSON.stringify(o)}`)
          )
        })
      })
  }
}

function offsets (type) {
  if(type === 'topic')
    offsetsTopic()
  else if(type === 'group')
    offsetsGroup()
  else {
    console.log(
      chalk.red.bold(`No type!!!`)
    )
  }
}

module.exports = offsets
