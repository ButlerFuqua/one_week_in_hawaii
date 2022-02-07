require('dotenv').config()

// import colors from 'vuetify/es5/util/colors'

const primaryColor = '#3E50B1'
const secondaryColor = '#cc208e'

import generateHeadTags from './lib/generateMeta'

export default {
  ssr: true,
  modern: 'server',
  env: {
    isProduction: !process.env.isDevelopment,
    api_key: process.env.AIRTABLE_API_KEY,
    base_id: process.env.NOTIFY_ISLAND_AVAILABLE_BASE_ID,
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  asyncScripts: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: generateHeadTags('One Week in Hawaii', 'welcome', null, false),
  css: [
    '~/assets/css/global.css',
    '~/assets/css/nuxt-content.css',
  ],
  plugins: [
    // '~/plugins/components' // global components to make available in content md
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxt/content',
  ],
  sitemap: {
    hostname: 'https://oneweekinhawaii.com',
  },
  axios: {},
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    // defaultAssets: false,
    theme: {
      light: true,
      themes: {
        light: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
  },
  build: {
    extractCSS: true, // tbd on this one
    extractCSS: {
      ignoreOrder: true
    },
  },
}