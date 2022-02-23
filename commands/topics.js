const conf = new (require('conf'))()
const chalk = require('chalk')
const kafka = require('./../services/kafka');

async function topics () {
  const kServer = conf.get('kafka-server')
  if (kServer) {
    kafka.topics(kServer.brokers)
      .then(ts => {
        ts.forEach((t, index) => {
          console.log(
            chalk.yellowBright(`${index}. ${t}`)
          )
        })
      })
  } else {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  }
}

module.exports = topics
