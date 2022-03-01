import kafka from './../services/kafka'
import display from './../util/display'
import _ from 'lodash'
import configUtils from "../util/configUtils";

async function lag() {
  const sk = configUtils.getKafka()
  const group = configUtils.getGroup()

  const gOffsets = await kafka.groupOffsets(sk.brokers, group)
  const topics = _.uniq(gOffsets.map(go => go.topic))
  const tOffsets = _.flatten(
    await Promise.all(
      topics.map(topic => kafka.topicOffsets(sk.brokers, topic)
        .then(tos => tos.map(to => ({topic, ...to}))))
    ))

  const gOffsetsMap = new Map(gOffsets.map(i => [`${i.topic}-${i.partition}`, i.offset]));

  const lags = tOffsets.map(({topic, partition, offset}) => {
    const lag = Number.parseInt(offset) - Number.parseInt(gOffsetsMap.get(`${topic}-${partition}`))
    return {topic, partition, lag}
  })

  console.log(group)
  console.log(gOffsetsMap)
  display.print(lags)

}

module.exports = lag
