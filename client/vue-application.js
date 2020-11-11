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
    },
    methods:{
        async connect(username, password){
            let res= await axios.post('/api/connect', {username: username, password: password})
            alert(res.data.message)
            if(res.data.success){
                location.replace('http://localhost:3000/?#/pageperso')
            }
            console.log(res)
        },
        async register(username, password, house, role){
            let res=await axios.post('/api/register', {username: username, password: password, userhouse: house, prof:role})
            alert(res.data.message)
            console.log(res)
        },
        async logout(){
            let res=await axios.post('/api/logout')
            alert(res.data.message)
            location.replace('http://localhost:3000/?#/register')
            console.log(res)
        }
    }
})