import config from './../services/config'
import display from './../util/display'

function add(name, brokers) {
  const cluster = {name, brokers}
  config.addKafka(cluster)
  display.success(`Kafka cluster [${cluster.name}] has been added successfully!`)
}

module.exports = add
