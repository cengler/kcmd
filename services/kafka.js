const {Kafka, CompressionCodecs, CompressionTypes} = require("kafkajs");
const chalk = require("chalk");
const { SnappyCodec } = require('kafkajs-snappy')
const {v4} = require('uuid')

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec

const clientId = 'my-cli';

const k = (brokers) => {
  return new Kafka({
    clientId,
    brokers: brokers.split(','),
  })
}

const topics = async (brokers) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.listTopics()
  await admin.disconnect()
  return ts
}

const consumer = async (brokers, topic, cb) => {
  const kafka = k(brokers)
  const consumer = kafka.consumer({groupId: `${clientId}-${v4()}` })
  await consumer.connect()
  await consumer.subscribe({topic, fromBeginning: false})
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({topic, partition, message, heartbeat}) => {
      cb(message, partition)
    },
  })
}

const offsets = async (brokers, topic) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicOffsets(topic)
  await admin.disconnect()
  return ts
}

const topicMetadata = async (brokers, topic) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicMetadata({topics:[topic]})
  await admin.disconnect()
  return ts.topics[0].partitions
}

const groupOffsets = async (brokers, groupId) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchOffsets({ groupId })
  await admin.disconnect()
  return ts
}

const groups = async (brokers) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = (await admin.listGroups()).groups
  await admin.disconnect()
  return ts
}

module.exports = {
  topics,
  consumer,
  offsets,
  groupOffsets,
  groups,
  topicMetadata
}
