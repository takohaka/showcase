export default {
  head: {
    title: 'showcase',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    "~/modules/typescript.js"
  ],
  plugins: [
    "~/plugins/scroll.ts"
  ],
  css: [
    'reset-css'
  ],
  generate: {
    dir: 'docs'
  },
  router: {
    base: process.env.NODE_ENV === 'production' ? '/showcase/' : '/'
  },
  loading: {
    color: 'rgba(0, 120, 240, 0.5)',
  }
}
