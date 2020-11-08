const Home = window.httpVueLoader('./components/Home.vue')
const Pageperso = window.httpVueLoader('./components/Pageperso.vue')
const Register = window.httpVueLoader('./components/Register.vue')

const routes = [
    { path: '/', component: Home},
    { path: '/pageperso', component: Pageperso},
    { path: '/register', component: Register}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        tache: []
    }
})