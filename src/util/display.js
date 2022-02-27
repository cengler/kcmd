// display according configuration
import config from './../services/config'

const print = (data) => {
  if(config.getStringConfig(config.CONFIG_DISPLAY) === 'table') {
    console.table(data)
  } else {
    data.forEach(r => console.log(r))
  }

}

module.exports = {
  print
}
