# k

![tests](https://github.com/cengler/k/actions/workflows/test.yml/badge.svg)
![audit](https://github.com/cengler/k/actions/workflows/audit.yml/badge.svg)

## Project setup
```
npm i
```

## Kafka Docker for dev
```
docker-compose up -d
```
### enter interactively
```
docker exec -it k_kafka_1 bash
```

### create test data
```
docker exec k_kafka_1 /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic caeycae
```

## Persistent configuration files

### Mac
```
cat ~/Library/Preferences/k-nodejs/config.json 
```
