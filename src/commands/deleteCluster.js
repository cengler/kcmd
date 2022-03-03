import config from './../services/config'
import display from './../util/display'

function deleteCluster(name) {
  const cluster = {name, brokers}
  config.putCluster(cluster)
  display.success(`Kafka cluster [${cluster.name}] has been added successfully!`)
}

module.exports = deleteCluster
