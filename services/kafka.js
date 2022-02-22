const {Kafka} = require("kafkajs");
const chalk = require("chalk");

const clientId = 'my-cli';

const topics = async (brokers) => {
  const kafka = new Kafka({
    clientId,
    brokers: brokers.split(','),
  })
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.listTopics()
  await admin.disconnect()
  return ts
}

module.exports = {
 topics
}
