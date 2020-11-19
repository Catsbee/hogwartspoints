const Home = window.httpVueLoader('./components/Home.vue')
const Pageperso = window.httpVueLoader('./components/etudiant.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Serdaigle = window.httpVueLoader('./components/maisonSerdaigle.vue')
const Poufsouffle = window.httpVueLoader('./components/maisonPoufsouffle.vue')
const Gryffondor = window.httpVueLoader('./components/maisonGryffondor.vue')
const Serpentard = window.httpVueLoader('./components/maisonSerpentard.vue')
const prof = window.httpVueLoader('./components/prof.vue')

const routes = [
    { path: '/', component: Home},
    { path: '/etudiant', component: Pageperso},
    { path: '/register', component: Register},
    { path: '/maisonGryffondor', component: Gryffondor},
    { path: '/maisonSerpentard', component: Serpentard},
    { path: '/maisonPoufsouffle', component: Poufsouffle},
    { path: '/maisonSerdaigle', component: Serdaigle},
    { path: '/prof', component: prof}
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
                let user = await axios.get('/api/self')
                user = user.data.user[0].prof
                if (user)
                    location.replace('http://localhost:3000/?#/prof')
                else
                location.replace('http://localhost:3000/?#/etudiant')
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
        },
        async newtache(description, nomtache, points){
            let res = await axios.post('api/newtache', {tachedes: description, tachenom: nomtache, tachepoints: points})

            console.log(res)
        }
    }
})