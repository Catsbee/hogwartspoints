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
                    <form>
                        <div class="form-row">
                            <div class="col">
                                <input type="text" class="form-control" id="nomtache" placeholder="Nom de la tache">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="descriptiontache" placeholder="Description de la tache">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="pointstache" placeholder="Points attribuer">
                            </div>
                            <div class="col">
                                <button class="btn btn-outline-info">Créer</button>
                            </div>
                        </div>
                    </form>
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
        background-image:url("https://s2.qwant.com/thumbr/0x0/e/a/5a6f261357e3eaa647819600f3b6365603c03fc5d3fca0ab343c974248b238/thumb.png?u=http%3A%2F%2Fapi.thumbr.io%2Fb030257ea9fd7cede707d9bc07cfaa23%2FKhPZbWboUluRxv8PG87L%2Fhttps%3A%252F%252Fwww.freepik.com%2Fblog%2Fwp-content%2Fuploads%2F2016%2F11%2F01previa_stock.jpg%2F900x%2Fthumb.png&q=0&b=1&p=0&a=1");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .perso{
        background-image: url("https://bdbulle.files.wordpress.com/2008/08/achtergrond.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
