import {promisify} from 'util'
import * as esbuild from 'esbuild'
import * as enhancedResolve from 'enhanced-resolve'
import * as moduleLexer from 'cjs-module-lexer'
import * as fs from 'fs'
import * as path from 'path'
const resolve = promisify(
    enhancedResolve.create({
      mainFields: ['browser', 'module', 'main']
    })
)
let lexerInitialized = false

async function getExports(modulePath: string) {
    if (!lexerInitialized) {
      await moduleLexer.init()
      lexerInitialized = true
    }
    try {
      const exports = []
      const paths: string[] = []
      paths.push(await resolve(process.cwd(), modulePath) as string)
      while (paths.length > 0) {
        const currentPath = paths.pop()
        if(currentPath === undefined) {
          return
        }
        const results = moduleLexer.parse(fs.readFileSync(currentPath, 'utf8'))
        exports.push(...results.exports)
        for (const reexport of results.reexports) {
          const resolvedPath = await resolve(path.dirname(currentPath), reexport)
          if(typeof resolvedPath == 'string') {
            paths.push(resolvedPath)
          }
        }
      }
      /**
       * 追加default
       */
      if(!exports.includes('default')){
        exports.push('default')
      }
      return exports.join(', ')
    } catch (e) {
      console.log(e)
      return 'default'
    }
}
const cjs_to_esm_plugin: esbuild.Plugin = {
    name: 'cjs-to-esm',
    setup(build) {
      build.onResolve({ filter: /.*/ }, args => {
        if (args.importer === '') return { path: args.path, namespace: 'c2e' }
      })
      build.onLoad({ filter: /.*/, namespace: 'c2e' }, async args => {
        let keys = await getExports(args.path);
        const path = JSON.stringify(args.path)
        const resolveDir = process.cwd()
        return { contents: `export { ${keys} } from ${path}`, resolveDir }
      })
    },
}
export default cjs_to_esm_plugin
