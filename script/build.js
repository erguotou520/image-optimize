/**
 * electron 打包
 */
const path = require('path')
const rollup = require('rollup')
const argv = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const ora = require('ora')
const waitOn = require('wait-on')
const electron = require('electron-connect').server.create({ stopOnClose: true })
const options = require('./rollup.config')

const opt = options(argv.env)
const TAG = '[script/build.js]'
const spinner = ora(`${TAG} Electron build...`)

if (argv.watch) {
  waitOn(
    {
      resources: [`http://localhost:9987`],
      log: false
    },
    err => {
      if (err) {
        console.log(err)
        process.exit(1)
      }

      // once here, all resources are available
      const watcher = rollup.watch(opt)
      watcher.on('change', filename => {
        const log = chalk.green(`change -- ${filename}`)
        console.log(TAG, log)
      })
      watcher.on('event', ev => {
        if (ev.code === 'END') {
          // init-未启动、started-第一次启动、restarted-重新启动
          electron.electronState === 'init' ? electron.start() : electron.restart()
        } else if (ev.code === 'ERROR') {
          console.log(ev.error)
        }
      })
    }
  )
} else {
  spinner.start()
  rollup
    .rollup(opt)
    .then(build => {
      spinner.stop()
      console.log(TAG, chalk.green('Electron build successed.'))
      build.write(opt.output)
    })
    .catch(error => {
      spinner.stop()
      console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n')
    })
}
