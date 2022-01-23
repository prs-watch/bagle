import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@fontsource/advent-pro';
import '@fontsource/martel-sans';

import LinkCard from './components/LinkCard.vue';

createApp(App)
    .use(router)
    .use(ElementPlus)
    .component('LinkCard', LinkCard)
    .mount('#app');
