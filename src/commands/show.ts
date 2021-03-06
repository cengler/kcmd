import config from './../services/config'
import display from './../util/display'

function show(section: string | undefined) {
  // SELECTED
  if (!section || section === 'selected') {
    const selected = config.getConfig().selected
    display.success(`Selected: ${JSON.stringify(selected, null, 2)}`)
  }
  // CLUSTERS LIST
  if (!section || section === 'clusters') {
    const clusters = config.getConfig().clusters
    display.success(`Clusters: ${JSON.stringify(clusters, null, 2)}`)
  }
  // CONFIG
  if (!section || section === 'config') {
    const currentConfig = config.getConfig().config
    display.success(`Config: ${JSON.stringify(currentConfig, null, 2)}`)
  }
  // ERROR
  if (section && !['selected', 'clusters', 'config'].includes(section)) {
    display.error(`No section ${section} found`)
  }
}

export default show
