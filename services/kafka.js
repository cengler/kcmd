const {Kafka, CompressionCodecs, CompressionTypes} = require("kafkajs");
const chalk = require("chalk");
const { SnappyCodec } = require('kafkajs-snappy')

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec

const clientId = 'my-cli';
const groupId = 'my-group2';

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

const consumer = async (brokers, topic) => {
  const kafka = k(brokers)
  const consumer = kafka.consumer({groupId})
  await consumer.connect()
  await consumer.subscribe({topic, fromBeginning: false})
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({topic, partition, message, heartbeat}) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      })
    },
  })
}

module.exports = {
  topics,
  consumer
}
