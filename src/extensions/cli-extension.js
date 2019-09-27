const resolve = require('path').resolve

module.exports = toolbox => {
  toolbox.getPath = () => {
    const { parameters } = toolbox
    const { options } = parameters
    const paramPath = parameters.first || (options.path === true ? '.' : options.path || '.')
    if (paramPath === '.') {
      return resolve(process.cwd(), paramPath)
    }
    return resolve(process.cwd(), paramPath)
  },
  toolbox.getName = () => {
    const { parameters } = toolbox
    const { options } = parameters
    return parameters.second || (options.name === true ? 'tmuxop' : options.name || 'tmuxop')
  },
  toolbox.getFullPath = file => `${toolbox.getPath()}/${file}`.replace('//', '/')
}
