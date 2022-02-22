const conf = new (require('conf'))()
const chalk = require('chalk')

function kadd (name, servers) {
    let kafkaList = conf.get('kafka-list')

    if (!kafkaList) {
        kafkaList = []
    }
    kafkaList.push({
        name,
        servers
    })
    conf.set('kafka-list', kafkaList)
    console.log(
        chalk.green.bold('Kafka has been added successfully!')
    )
}

module.exports = kadd