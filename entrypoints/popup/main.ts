import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './style.scss';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import App from './App.vue';

const vuetify = createVuetify({
  defaults: {
    VBtn: {
      size: 'small',
      color: 'primary',
    }
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.deepOrange.base,
          secondary: colors.amber.base,
          accent: colors.deepOrange.accent1,
          error: colors.red.base,
          warning: colors.orange.base,
          info: colors.blue.base,
          success: colors.green.base,
          background: colors.grey.lighten3,
          surface: colors.grey.lighten5,
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.deepOrange.base,
          secondary: colors.amber.base,
          accent: colors.deepOrange.accent1,
          error: colors.red.base,
          warning: colors.orange.base,
          info: colors.blue.base,
          success: colors.green.base,
          background: colors.grey.darken3,
          surface: colors.grey.darken4,
        }
      }
    }
  }
})

createApp(App)
  .use(vuetify)
  .mount('#app');
