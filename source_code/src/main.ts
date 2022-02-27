import { createApp } from 'vue'
import App from './app.vue'
import { clickOutsideDirective } from './directives/clickOutside'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).directive('click-outside', clickOutsideDirective).mount('#app')
