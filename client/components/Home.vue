<template>
    <div class="home">
        <div class="jumbotron jumbotron-fluid change text-center">
            <div class="container">
                <div id="titre">
                    <h1>Hogwarts Point</h1>
                    <p>Bienvenue dans votre compteur de points façon Poudlard</p>
                </div>

            </div>
        </div>

        <div class="container">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <h3>Bienvenue cher élèves et professeur dans le compteur de points Poudlard !</h3>
                        <br>
                        <p>
                            Vous pourrez ici voir le classement des maisons Poufsouffle, Serpentard, Seirdaigle et Gryffodor.
                            Les professeurs pourront créer des épreuve que les élève devront surmonter. A la suite ils valideront
                            vos épreuve ce qui donnera automatiquement des points à l'élève (ici pas question d'attribution de points
                            à la dernière minute, on connait la chanson"
                            Faite de votre mieux et faites remporter la coupe à votre maison !
                        </p>
                        <p>
                            Ci-dessous vous trouverez votre total de points par maison. Vous avez aussi accés au détails de point
                            dans les onglets affilliez à vos maisons.
                        </p>
                    </div>
                    <div>
                        <br><br>
                    </div>
                    <div class="row">
                        <div class="card-group">
                            <div class="card">
                                <img src="../assets/logo_poufsouffle.png" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Poufsouffle</h5>
                                    <p class="card-text">Equilibre, Loyauté, Constance, Patiance</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div class="card">
                                <img src="../assets/logo_serdaigle.png" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Serdaigle</h5>
                                    <p class="card-text">Sagesse, Discernement, Erudition, Curiosité</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div class="card">
                                <img src="../assets/logo_serpentard.png" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Serpentard</h5>
                                    <p class="card-text">Malice, Adresse, Détermination</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div class="card">
                                <img src="../assets/logo_gryffondor.png" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Gryffondor</h5>
                                    <p class="card-text">Courage, Hardiesse, Force d'Esprit</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <br><br>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div>
                        <br><br>
                    </div>
                    <div>
                        <label for="tableTache" class="h3 mt-3 mb-3">Table des tâches</label>
                        <table class="table" id="tableTache">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Description</th>
                                <th scope="col">Points</th>
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
                <img src="../assets/logo_allhouse.png" class="card-img-bottom" alt="...">
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
<style>
    .change{
        background-image:url("../assets/header_homepage.jpg") ;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .home{
        background-image: url("../assets/fond_papyrus.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }


</style>