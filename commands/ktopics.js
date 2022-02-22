const conf = new (require('conf'))()
const chalk = require('chalk')
const { Kafka } = require('kafkajs')

async function ktopics () {
    const server = conf.get('kafka-server')
    console.log(server)
    if (server) {


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['rc-tracker-kafka-00.despexds.net:9092'],
  })    

  const admin = kafka.admin()

  await admin.connect()

  const ts = await admin.listTopics()

        // buscar 
        
        ts.forEach((topic, index) => {
            console.log(
                chalk.yellowBright(`${index}. ${topic}`)
            )
            
        })

        await admin.disconnect()
    } else {
        console.log(
            chalk.red.bold('You don\'t have a kakfa selected yet.')
        )
    }
}
module.exports = ktopics