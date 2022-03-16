import configUtils from './../util/configUtils'
import kafka from './../services/kafka'

function consumer () {
  const sk = configUtils.getKafka()
  const topic = configUtils.getTopic()
  kafka.consumer(sk.brokers, topic)
}

export default consumer
