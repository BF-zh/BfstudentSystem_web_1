import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// UnoCSS
import unocss from 'unocss/vite'

// 自动导入组件
import Components from 'unplugin-vue-components/vite'

// 自动导入组件的预设
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 自动导入vue3的hooks
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    unocss(),
    Components({
      dirs: ['src/components'],
      deep: true,
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts',
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      dirs:['src/composables/**'],
      dts: 'types/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
