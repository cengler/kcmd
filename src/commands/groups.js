import config from './../services/config'
import chalk from 'chalk'
import kafka from "./../services/kafka"

function groups () {
    const server = config.getKafka()
    if (!server) {
        console.log(
          chalk.red.bold('You don\'t have a kafka selected yet.')
        )
    } else {
        kafka.groups(server.brokers)
          .then(gs => {
              // console-table-printer
              //console.table(gs);
              gs.forEach((g, index) => {
                  console.log(
                    chalk.yellowBright(`${index}. ${g.groupId}`)
                  )
              })
            /*gs.forEach((g, index) => {
                  console.log(
                    chalk.yellowBright(`${index}. ${JSON.stringify(g)}`)
                  )
              })*/
          })
    }
}
module.exports = groups
