import kafka from './../services/kafka'
import display from './../util/display'
import configUtils from "../util/configUtils";

async function topicMetadata() {
  const sk = configUtils.getKafka()
  const topic = configUtils.getTopic()
  kafka.topicMetadata(sk.brokers, topic)
    .then(tm => display.print(tm))
}

function metadata(type) {
  switch (type) {
    case 'topic':
      topicMetadata()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: topic')
  }
}


module.exports = metadata
