import * as i18n from 'i18next'
import * as LanguageDetector from 'i18next-browser-languagedetector'
import localesResources from './localesResources'
import { reactI18nextModule } from 'react-i18next'

const options: i18n.InitOptions = {
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',
  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  react: {
    wait: true,
  },

  resources: localesResources,
}

console.log(localesResources)

const myi18n = i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init(options)

export default myi18n
