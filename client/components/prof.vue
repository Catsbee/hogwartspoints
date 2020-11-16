<template>
    <div class="container">
      <div>
        <h3>Creation de nouvelle tache</h3>
        <input type="text" v-model="tache.tachenom">
        <input type="text" v-model="tache.tachedes">
        <input type="number" v-model="tache.tachepoints">
        <button @click="newtache">Valider</button>
      </div>
      <div>
        <label for="tableTache">Table des taches</label>
        <table class="table" id="tableTache">
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
              student : []
            }
        },
      async mounted (){
          this.tasks = await axios.get('/api/getTache');
          this.tasks = this.tasks.data
      },
        methods :{
            newtache(){
                this.$emit('newtache',  this.tache.tachedes,this.tache.tachenom, this.tache.tachepoints);
                location.reload();
            }
        }
    }
</script>