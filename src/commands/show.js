import config from './../services/config'
import display from './../util/display'

function show() {
  // SELECTED
  const selected = config.getSelected()
  if (selected) {
    display.info(`Selected: ${JSON.stringify(selected, null, 2)}`)
  } else {
    display.info('Selected: <none>')
  }
  // CONFIG
  const currentConfig = config.getConfig()
  display.info(`Config: ${JSON.stringify(currentConfig, null, 2)}`)
  // CLUSTERS LIST
  const clusters = config.getClusters()
  display.info(`Clusters: ${JSON.stringify(clusters, null, 2)}`)
}

module.exports = show
