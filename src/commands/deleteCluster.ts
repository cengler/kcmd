import config from './../services/config'
import display from './../util/display'

function deleteCluster(name: string) {
  const deleted = config.deleteCluster(name)
  if(deleted)
    display.success(`Kafka cluster [${name}] has been added successfully!`)
  else
    display.error(`Cluster [${name}] not found`)
}

export default deleteCluster
