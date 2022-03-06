import config from './../services/config'
import display from './../util/display'

function show(section) {
  // SELECTED
  if (!section || section === 'selected') {
    const selected = config.getSelected()
    if (selected) {
      display.info(`Selected: ${JSON.stringify(selected, null, 2)}`)
    } else {
      display.info('Selected: <none>')
    }
  }
  // CLUSTERS LIST
  if (!section || section === 'clusters') {
    const clusters = config.getClusters()
    display.info(`Clusters: ${JSON.stringify(clusters, null, 2)}`)
  }
  // CONFIG
  if (!section || section === 'config') {
    const currentConfig = config.getConfig()
    display.info(`Config: ${JSON.stringify(currentConfig, null, 2)}`)
  }
  // ERROR
  if (!section || !['selected', 'clusters', 'config'].includes(section)) {
    display.error(`No section ${section} found`)
  }
}

module.exports = show
