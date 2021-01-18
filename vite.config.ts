/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from 'path'
import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const root = join(__dirname, 'src/render')

const config: UserConfig = {
  root,
  alias: {
    '/@': root
  },
  build: {
    base: '.',
    outDir: join('../../dist/render'),
    emptyOutDir: true
  },
  server: {
    port: 9987
  },
  plugins: [vue(), vueJsx({})],
  optimizeDeps: {
    auto: true,
    exclude: ['svgo']
  }
}

export default config
