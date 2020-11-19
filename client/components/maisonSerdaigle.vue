<template>
    <div class="serdaigle">
        <div class="jumbotron jumbotron-fluid changeSerd text-center">
            <div class="container">
                <div id="titre">
                    <h1>Chambre commune</h1>
                    <h3>Sagesse, Discernement, Erudition, Curiosité</h3>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="card mb-3">
                    <img src="../assets/dicton_serdaigle.png" class="card-img-top" alt="..." height="50%"  >
                    <div class="card-body">
                        <h5 class="card-title">Bienvenue dans la chambre commune des Serdaigle</h5>
                        <p class="card-text">L’autre atout des Serdaigle, c’est que nous sommes des
                            gens très originaux, voire excentriques, aux dires de certains. Mais il
                            est vrai que les personnes ordinaires ont du mal à suivre les génies !
                            Contrairement aux élèves de certaines maisons dont je tairai le nom, ici,
                            nous estimons avoir le droit de porter ce qui nous plaît, de penser comme
                            bon nous semble et de dire ce que nous pensons. Les gens différents ne nous
                            impressionnent pas. Au contraire, nous savons les apprécier à leur juste valeur.</p>


                      <table class="table" id="tableTache">
                        <thead class="thead-dark">
                        <tr>
                          <th scope="col">Rank</th>
                          <th scope="col">Nom</th>
                          <th scope="col">Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(eleve, index) in students">
                          <th scope="row">{{index + 1}}</th>
                          <th scope="row">{{eleve.username}}</th>
                          <th scope="row">{{eleve.total}}</th>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>

      <div>

      </div>
    </div>
</template>
<script>
  module.exports = {
    data(){
      return {
        students : []
      }
    },
    async mounted(){
      let student = await axios.post('/api/getHouse', {userhouse : "Serdaigle"})
      student = student.data
      for (let i = 0; i < student.length; i++){
        let total = await axios.post('/api/getUser', {userid : student[i].userid})
        student[i]["total"] = total.data.total
      }
      for (let i = student.length - 1; i > 0; i--){
        for(let j = 0; j < i; j++){
          if (student[j].total < student[j+1].total){
            let temp = student[j]
            student[j] = student[j+1]
            student[j+1] = temp
          }
        }
      }
      this.students = student
    },
    methods : {

    }
  }
</script>
<style>
    .changeSerd{
        background-image:url("../assets/header_serdaigle.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .serdaigle{
        background-image: url("../assets/fond_serdaigle.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>