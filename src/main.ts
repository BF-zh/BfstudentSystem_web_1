import 'uno.css'
import App from './App.vue'
import router from './router'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
