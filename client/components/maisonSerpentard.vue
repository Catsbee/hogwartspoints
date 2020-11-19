<template>
    <div class="serpentard">
        <div class="jumbotron jumbotron-fluid changeSerp text-center">
            <div class="container">
                <div id="titre">
                    <h1>Chambre commune</h1>
                    <h3>Malice, Adresse, Détermination</h3>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="card mb-3">
                    <img src="../assets/dicton_serpentard.png" class="card-img-top" alt="..." height="50%">
                    <div class="card-body">
                        <h5 class="card-title">Bienvenue dans la chambre commune de "maison"</h5>
                        <p class="card-text">L'honneur et les traditions des Serpentard sont des valeurs
                            qui nous tiennent à cœur. Nous imposons aussi le respect à tous nos camarades
                            de classe. Il est vrai qu'à cause de notre réputation de sinistre mémoire, ce
                            respect est parfois teinté de peur. Mais tu sais quoi ? Le fait d'être perçu par
                            les autres comme des provocateurs et des roublards présente quelques avantages qui
                            peuvent parfois être très drôles ! Amuse-toi, par exemple, à faire croire aux autres
                            élèves que tu as accès à une immense collection de sortilèges et tu verras vite que
                            plus personne n'osera te voler ta trousse !</p>
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
    let student = await axios.post('/api/getHouse', {userhouse : "Serpentard"})
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
    this.housepoints = pts.data.serpentard
  },
  methods : {

  }
}
</script>
<style>
    .changeSerp{
        background-image:url("../assets/header_serpentard.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .serpentard{
        background-image: url("../assets/fond_serpentard.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

</style>