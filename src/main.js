import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BaseDialog from './components/ui/BaseDialog.vue';

import './assets/css/tailwind.css';

const app = createApp(App);
app.use(router);
app.use(store);

app.component('base-dialog', BaseDialog);

app.mount('#app');
