const { join } = require('path')
const { readJSONSync, readdirSync, pathExistsSync } = require('fs-extra')
const { difference, omit } = require('lodash')

// 搜索结果
const depPaths = ['svgo']

function getDependencies(_module) {
  const pkgFile = join(_module.startsWith('node_modules') ? '' : 'node_modules', _module, 'package.json')
  try {
    const pkg = readJSONSync(pkgFile)
    if (pkg.dependencies) {
      // console.log('module->', _module, Object.keys(pkg.dependencies))
      const deps = Object.keys(pkg.dependencies)
      // 遍历当前node_modules目录
      const modulePath = join(pkgFile, '../node_modules')
      // console.log('modulePath -->', modulePath)
      let subModuls = []
      if (pathExistsSync(modulePath)) {
        subModuls = difference(readdirSync(modulePath), ['@types', '.bin'])
      }
      // 排除package.json中的dependency
      const includedPaths = difference(deps, subModuls)
      depPaths.push(...includedPaths.filter(p => !depPaths.includes(p)))
      // 递归遍历子模块
      for (const _subModule of includedPaths) {
        getDependencies(_subModule)
      }
      // 遍历node_modules目录里的子模块
      for (const _subModule of subModuls) {
        getDependencies(join(modulePath, _subModule))
      }
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

;['svgo'].map(_module => getDependencies(_module))
console.log(depPaths.join(','))
