const conf = new (require('conf'))()
const chalk = require('chalk')

function klist () {
    const kafkaList = conf.get('kafka-list')
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
module.exports = klist
