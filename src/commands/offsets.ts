import kafka from './../services/kafka'
import display from './../util/display'
import configUtils from '../util/configUtils'
import _ from 'lodash'

function offsetsTopic() {
  const sk = configUtils.getKafka()
  const topic = configUtils.getTopic()
  kafka.topicOffsets(sk.brokers, topic)
    .then(os => display.print(os))
}

async function offsetsGroup() {
  const sk = configUtils.getKafka()
  const group = configUtils.getGroup()
  const gOffsets = await kafka.groupOffsets(sk.brokers, group)
  const topics = _.uniq(gOffsets.map(go => go.topic))
  const tOffsets = _.flatten(
    await Promise.all(
      topics.map(topic => kafka.topicOffsets(sk.brokers, topic)
        .then(tos => tos.map(to => ({topic, ...to}))))
    ))
  const gOffsetsMap = new Map(gOffsets.map(i => [`${i.topic}-${i.partition}`, i.offset]))
  const lags = tOffsets.map(({topic, partition, offset}) => {
    const topicOffset = Number.parseInt(offset)
    const gOffset = gOffsetsMap.get(`${topic}-${partition}`)
    const groupOffset = gOffset ? Number.parseInt(gOffset) : 0
    const lag = topicOffset - groupOffset
    return {
      topic,
      partition,
      lag,
      topicOffset,
      groupOffset
    }
  })
  display.print(lags)
}

function offsets(type: string) {
  switch (type) {
    case 'topic':
      offsetsTopic()
      break
    case 'group':
      offsetsGroup()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: topic, group')
  }
}

export default offsets
