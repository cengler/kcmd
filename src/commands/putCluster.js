import config from './../services/config'
import display from './../util/display'

function putCluster(name, brokers) {
  const cluster = {name, brokers}
  const res = config.putCluster(cluster)
  display.success(`Kafka cluster [${cluster.name}] has been ${res} successfully!`)
}

module.exports = putCluster
