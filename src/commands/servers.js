import config from './../services/config'
import chalk from 'chalk'

function add (name, brokers) {
    config.addKafka({
        name,
        brokers
    })
    console.log(
      chalk.green.bold('Kafka has been added successfully!')
    )
}

function clusters () {
    const kafkaList = config.getKafkaList()
    if (kafkaList && kafkaList.length) {
        kafkaList.forEach((kafka, index) => {
            console.log(
              chalk.yellowBright(`${index}. Name: ${kafka.name} Brokers: ${kafka.brokers}`)
            )
        })
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
