import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import store from './store'; // Adicione esta linha
import 'animate.css';

const app = createApp(App);

app.use(Quasar, quasarUserOptions)
    .use(router)
    .use(store)
    .mount('#app');
