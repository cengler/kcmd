import config, {KafkaCluster} from './../services/config'
import display from './../util/display'
import {split} from "lodash";

function putCluster(name: string, brokers: string) {
  const cluster: KafkaCluster = {name, brokers: brokers.split(',')}
  const res: boolean = config.putCluster(cluster)
  display.success(`Kafka cluster [${cluster.name}] has been ${res ? 'added' : 'updated'} successfully!`)
}

export default putCluster
