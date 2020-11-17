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
                                <img src="https://s2.qwant.com/thumbr/0x380/5/0/26dc918a664ee03e6b1c7f540ed7f748866657ae506d8cf3c633fb17202151/hufflepuff_transparent.png?u=https%3A%2F%2Fstatic.tvtropes.org%2Fpmwiki%2Fpub%2Fimages%2Fhufflepuff_transparent.png&q=0&b=1&p=0&a=1" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Poufsouffle</h5>
                                    <p class="card-text">Equilibre, Loyauté, Constance, Patiance</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div class="card">
                                <img src="https://s2.qwant.com/thumbr/0x380/e/9/5d96987e16737c558ca38874737148b1a10a2aeade37297d9aca900f3d897c/Serdaigle.png?u=http%3A%2F%2Funiversharrypotter.com%2Fwp-content%2Fuploads%2F2016%2F11%2FSerdaigle.png&q=0&b=1&p=0&a=1" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Serdaigle</h5>
                                    <p class="card-text">Sagesse, Discernement, Erudition, Curiosité</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div class="card">
                                <img src="https://static.wikia.nocookie.net/harrypotter/images/d/d3/0.61_Slytherin_Crest_Transparent.png/revision/latest/scale-to-width-down/250?cb=20180701145136&path-prefix=nl" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Serpentard</h5>
                                    <p class="card-text">Malice, Adresse, Détermination</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div class="card">
                                <img src="https://s1.qwant.com/thumbr/0x0/2/2/a1d6c13b5d8f944f05d056b5be44717fd77a478e5b7fec207f124a6a1ee0a3/latest.jpg?u=http%3A%2F%2Fvignette1.wikia.nocookie.net%2Fharrypotter%2Fimages%2F2%2F28%2FGryffindor_ClearBG2.png%2Frevision%2Flatest%3Fcb%3D20160702234105&q=0&b=1&p=0&a=1" class="card-img-top" alt="...">
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
                <img src="https://64.media.tumblr.com/3c8bb0c0e29d03ea8a87275b8c8e1440/a4ffb58ec3edf49c-49/s1280x1920/05b14d885a08d7ebbbcbe8a42f3071e96e7d78f2.png" class="card-img-bottom" alt="...">
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
        background-image:url("https://s2.qwant.com/thumbr/0x0/e/f/3f282dabe5bee77ca0c0f71861f563dbc2038f3b4da4fb4aa98dadb657b89c/hogwartsblog-1525112612664_1280w.jpg?u=http%3A%2F%2Fassets1.ignimgs.com%2F2018%2F04%2F30%2Fhogwartsblog-1525112612664_1280w.jpg&q=0&b=1&p=0&a=1");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .home{
        background-image: url("https://bdbulle.files.wordpress.com/2008/08/achtergrond.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }


</style>