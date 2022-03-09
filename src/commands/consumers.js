import configUtils from './../util/configUtils'
import kafka from './../services/kafka'
import display from './../util/display'
import _ from 'lodash'

const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})

async function consumers () {
  display.info('List of all consumers by topic')
  const sk = configUtils.getKafka()
  const groups = await kafka.groups(sk.brokers)
  const groupsTopics = await Promise.all(groups
      .map(group => {
        return kafka.groupMetadata(sk.brokers, group.groupId)
          .then(gm => ({
            topics: _.uniq(gm.members.map(m => m.memberMetadata)),
            groupId: group.groupId
          }))
      }))
  // TODO reduce function?
  const res = {}
  groupsTopics.forEach(gt => {
    gt.topics.forEach(t => {
      if(!res.hasOwnProperty(t))
        res[t] = []
      res[t].push(gt.groupId)
    })
  })
  display.print(sortObject(res))
}

module.exports = consumers
