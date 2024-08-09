import { defineConfig } from 'wxt';
import { GRAY_ICONS } from './utils/icons';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    action: {
      default_icon: GRAY_ICONS,
      default_title: 'CrunchyComments'
    },
    permissions: ['webNavigation'],
    name: 'CrunchyComments'
  }
});
