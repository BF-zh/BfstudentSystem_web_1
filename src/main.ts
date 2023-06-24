import 'uno.css'
import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind-compat.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
