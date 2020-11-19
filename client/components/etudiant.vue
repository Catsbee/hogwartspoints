<template>
    <div class="perso">
        <div class="jumbotron jumbotron-fluid changePerso text-center">
            <div class="container">
                <div id="titre">
                    <h1>Hogwarts Point</h1>
                    <p>Bienvenue dans votre compteur de points façon Poudlard</p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <button @click="logout" class="btn btn-outline-info">Se tej</button>
                    </div>
                    <h2><br>Bienvenue {{curruser.username}}</h2>
                  <p>Total des points : {{points}}</p>
                    <h2><br>Tableau personnel</h2>
                    <table class="table table-hover">
                      <thead class="thead-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Points</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="task in tasks">
                        <th scope="row">{{task.tacheid}}</th>
                        <th scope="row">{{task.tachenom}}</th>
                        <th scope="row">{{task.tachedes}}</th>
                        <th scope="row">{{task.tachepoints}}</th>
                      </tr>
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data(){
          return {
            tasks : [],
            curruser : {userid : -1, username : "", taches :[], userhouse :'', password:'',prof:false},
            points : 0
          }
        },
        methods:{
            logout(){
                this.$emit('logout');
            }
        },
        async mounted(){
          let user = await axios.get('/api/self');
          if (user.data.user.length === 0 || (user.data.user[0].prof)){
            location.replace("http://localhost:3000/?#/")
            alert("Thou shall not pass")
          }
          this.curruser = user.data.user[0]
          let taches = await axios.post('/api/getUser', {userid: this.curruser.userid})
          this.points = taches.data.total
          taches = taches.data.tasks
          for (let i = 0; i < taches.length;i++){
            let temp = await axios.post('/api/getOneTache', {tacheid : taches[i]})
            this.tasks.push(temp.data[0])
          }
          console.log(taches)
        }
    }
</script>

<style>
    .changePerso{
        background-image:url("../assets/header_etudiant.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .perso{
        background-image: url("../assets/fond_papyrus.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>
