const app = Vue.createApp({
    data() {
        return {
            text : "new",
        }
    }
})
app.use(ElementPlus)
app.mount("#Frontend_main")