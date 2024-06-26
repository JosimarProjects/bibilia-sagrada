
import 'quasar/dist/quasar.css'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Notify } from 'quasar';


// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify
  },
  iconSet: iconSet
}
