<template>
    <div class="gryffondor">
        <div class="jumbotron jumbotron-fluid changeGryffon text-center">
            <div class="container">
                <div id="titre">
                    <h1>Chambre commune</h1>
                    <h3>Courage, Hardiesse, Force d'Esprit</h3>
                </div>
            </div>
        </div>
        <div class="container ">
            <div class="row">
                <div class="card mb-3">
                    <img src="../assets/dicton_gryffondor.png"
                         class="card-img-top" alt="..." height="60%" style="background-size: cover;
                        background-position: center;
                           background-repeat: no-repeat;">
                    <div class="card-body">
                        <h5 class="card-title">Bienvenue dans la chambre commune des Gryffondor</h5>
                        <p class="card-text">C'est la plus courageuse de toutes les créatures. Nos couleurs
                            sont le rouge et l'or. Et notre salle commune se trouve au sommet de la tour de
                            Gryffondor. Gryffondor est tout simplement la meilleure maison de Poudlard !
                            Seuls les plus hardis et les plus forts sont envoyés ici, comme notamment Albus Dumbledore ! </p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      <h3 class="text-center">Total des points de la maison : {{housepoints}}</h3>
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
      students : [],
      housepoints : 0
    }
  },
  async mounted(){
    let student = await axios.post('/api/getHouse', {userhouse : "Gryffondor"})
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
    let pts = await axios.get('/api/housepoints');
    this.housepoints = pts.data.gryffondor
  },
  methods : {

  }
}
</script>
<style>
    .changeGryffon{
        background-image:url("../assets/header_gryffodor.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }

    .gryffondor{
        background-image: url("../assets/fond_gryffondor.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>