const fs = require('fs')
const resolve = require('path').resolve
const readline = require('readline-sync')
const chalk = require('chalk')
const exec = require('shelljs').exec // child_process or shelljs
const startCommands = require('../data/startCommands')
const projectCommands = require('../data/projectCommands')

const hiddens = file => !file.match(/^\..*/)
const spacedNames = file => {
  if (file.match(/\s/)) {
    throw new Error(`Sorry, the directory path "${file}" has space on string.`)
  }
  return file
}
const onlyFiles = file => fs.lstatSync(file).isDirectory()
const shouldBeOpen = directory => {
  const response = readline.question(
    chalk.green.underline(`You want open "${directory}" folder in this tmux session? [y/N] `)
  ).toLocaleUpperCase() || 'N'
  return response === 'Y'
}

const getProjectCommands = directory => {
  const commands = `${projectCommands.join('').replace(/pathname/g, directory)}`
  if (projectCommands[0] !== 'new-window \\; \\\n') {
    projectCommands.unshift('new-window \\; \\\n')
  }
  return commands
}

module.exports = {
  name: 'tmuxop',
  run: async toolbox => {
    const path = toolbox.getPath()
    const { parameters: { options } } = toolbox
    const name = toolbox.getName()
    const commands = [
      startCommands.join('').replace('namesession', name)
    ]

    if (options['status'] === false) {
      commands[0] = `tmux new-session -s ${name} \\; \\\n`
      projectCommands.shift()
    }

    fs.readdir(path, (err, files) => {
      if (err) throw new Error('Param path not exists.')

      if (options['status-only']) {
        exec(`echo ${commands.join('')}`)
        return
      }

      if (options['path-only']) {
        commands.push(
          `${projectCommands.join('').replace(/pathname/g, resolve(path))}`
        )
        exec(`echo ${commands.join('')}`)
        return
      }

      files = files
        .map(toolbox.getFullPath)
        .filter(hiddens)
        .filter(spacedNames)
        .filter(onlyFiles)
        .filter(shouldBeOpen)
        .map(getProjectCommands)

      const execute = commands.concat(...files).join('')

      exec(`echo ${execute}`)
    })
  }
}
