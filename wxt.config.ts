import { defineConfig } from 'wxt';
import vuetify from 'vite-plugin-vuetify'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ['webNavigation'],
    name: 'CrunchyComments'
  },
  vite: () => ({
    plugins: [
      vuetify({ autoImport: true })
    ]
  })
});
