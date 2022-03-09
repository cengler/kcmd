import kafka from './../services/kafka'
import display from './../util/display'
import configUtils from '../util/configUtils'

async function topicMetadata() {
  const sk = configUtils.getKafka()
  const topic = configUtils.getTopic()
  kafka.topicMetadata(sk.brokers, topic)
    .then(tm => display.print(tm))
}

async function groupMetadata() {
  const sk = configUtils.getKafka()
  const group = configUtils.getGroup()
  kafka.groupMetadata(sk.brokers, group)
    .then(gm => {
      display.print([gm], ['errorCode', 'groupId', 'state', 'protocolType', 'protocol'])
      const dm = gm.members.map(m => ({
        // hide memberId: m.memberId,
        clientId: m.clientId,
        clientHost: m.clientHost,
        memberAssignment: m.memberAssignment,
        memberMetadata: m.memberMetadata
      }))
      display.print(dm)
    })
}

function metadata(type) {
  switch (type) {
    case 'topic':
      topicMetadata()
      break
    case 'group':
      groupMetadata()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: topic')
  }
}


module.exports = metadata
