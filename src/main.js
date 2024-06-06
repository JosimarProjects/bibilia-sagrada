import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import store from './store'; // Adicione esta linha

const app = createApp(App);

app.use(Quasar, quasarUserOptions)
    .use(router)
    .use(store) // Adicione esta linha
    .mount('#app');
