<template>
  <div class="prof">
    <div class="jumbotron jumbotron-fluid changeProf text-center">
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
          <div>
            <div class="row">
              <button @click="logout" class="btn btn-outline-info">Se tej</button>
            </div>
            <label for="tableTache" class="h3 mt-3 mb-3">Table des tâches</label>
            <table class="table" id="tableTache">
              <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Description</th>
                <th scope="col">Points</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="task in tasks">
                <th scope="row">{{task.tacheid}}</th>
                <th scope="row">{{task.tachenom}}</th>
                <th scope="row">{{task.tachedes}}</th>
                <th scope="row">{{task.tachepoints}}</th>
                <th scope="row"><button @click="test(task.tacheid)" class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">Attribuer la tache</button></th>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="mb-5">
            <h3 class="mb-3">Creation de nouvelle tâche</h3>
            <input type="text" v-model="tache.tachenom">
            <input type="text" v-model="tache.tachedes">
            <input type="number" v-model="tache.tachepoints">
            <button @click="newtache">Valider</button>
          </div>

        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Faire valider la tache</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                Veuillez sélectionner un élève parmi cette liste
              </p>
              <select multiple class="form-control" id="usernameEleve" @change="onChange($event)">
                <option v-for="student in students">{{student.username}}</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="assignTache(eleve)">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
    module.exports = {
        data (){
            return {
                tache:{
                    tachedes:"Description",
                    tachenom:"Nom de la tache",
                    tachepoints:0
                },
              tasks : [],
              students : [],
              eleve : 'qwerty2',
              tacheId : "1"
            }
        },
      async mounted (){
        let prof = await axios.get('/api/isProf');
          if (!(prof.data )){
            location.replace("http://localhost:3000/?#/")
            alert("Thou shall not pass")
          }
          this.tasks = await axios.get('/api/getTache');
          this.tasks = this.tasks.data
          this.students = await axios.get('/api/eleve')
          this.students = this.students.data
      },
        methods :{
            newtache(){
                this.$emit('newtache',  this.tache.tachedes,this.tache.tachenom, this.tache.tachepoints);
                location.reload();
            },
            async assignTache(username){
              let test = await axios.put('/api/assignTache', {username : username, tacheid:this.tacheId});
              alert(test.data.message)
            },
          onChange(event){
              if (event.type === 'change')
                this.eleve = event.target.value;
          },
          test(t){
              this.tacheId = t
          },
          logout(){
            this.$emit('logout');
          }
        }
    }
</script>
<style>
  .changeProf{
    background-image:url("https://s2.qwant.com/thumbr/0x0/c/3/a348122743922055476bf7135f227dcf37e4d4ad0b8075ee32e13dcddce263/Salle_des_profs.png?u=http%3A%2F%2Fimg1.wikia.nocookie.net%2F__cb20131024124844%2Fharrypotter%2Ffr%2Fimages%2Ff%2Ffe%2FSalle_des_profs.png&q=0&b=1&p=0&a=1");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

  }
  #titre{
    color:white;
    text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
  }
  .prof{
    background-image: url("https://bdbulle.files.wordpress.com/2008/08/achtergrond.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>