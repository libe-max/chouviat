const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Les 26 minutes fatales à Cédric Chouviat',
    url: 'https://www.liberation.fr/apps/2020/07/26-minutes-fatales-a-cedric-chouviat',
    description: 'Libération reconstitue, seconde par seconde, l\'interpellation qui a conduit à la mort du chauffeur-livreur, le 3 janvier à Paris.',
    image: 'https://www.liberation.fr/apps/2020/07/26-minutes-fatales-a-cedric-chouviat/social.png',
    xiti_id: '26-minutes-chouviat',
    tweet: 'Libération reconstitue, seconde par seconde, l\'interpellation qui a conduit à la mort du chauffeur-livreur, le 3 janvier à Paris.',
  },
  tracking: {
    active: false,
    format: 'chouviat',
    article: 'chouviat'
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${currentProtocol}//${currentHostname}:3003`,
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : `${currentProtocol}//${currentHostname}:3004/api`,
  stylesheet: 'libe-apps-template.css', // The name of the css file hosted at ${statics_url}/styles/apps/
  spreadsheet: undefined // The spreadsheet providing data to the app
}

module.exports = config
