<template>
    <div class="container">
      <div>
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
        <button data-toggle="modal" data-target="#exampleModal">Afficher el modal</button>
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
          }
        }
    }
</script>