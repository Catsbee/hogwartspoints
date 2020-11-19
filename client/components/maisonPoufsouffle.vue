<template>
    <div class="poufsouffle">
        <div class="jumbotron jumbotron-fluid changePouf text-center">
            <div class="container">
                <div id="titre">
                    <h1>Chambre commune</h1>
                    <h3>Equilibre, Loyauté, Constance, Patiance</h3>
                </div>

            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="card mb-3">
                    <img src="../assets/dicton_poufsouffle.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Bienvenue dans la chambre commune des Poufsouffle</h5>
                        <p class="card-text">Les Poufsouffle sont fidèles et dignes de confiance.
                            Si nous n’aimons pas nous vanter, nous n’aimons pas non plus qu’on s’en prenne à nous.
                            Gare à ceux qui nous cherchent des noises ! À l’image de notre emblème, le blaireau, nous
                            nous défendrons et défendrons vaillamment nos amis et nos proches contre tout ennemi.
                            Personne ne nous fait peur.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
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
    let student = await axios.post('/api/getHouse', {userhouse : "Poufsouffle"})
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
    .changePouf{
        background-image:url("../assets/header_poufsouffle.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .poufsouffle{
        background-image: url("../assets/fond_poufsouffle.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>