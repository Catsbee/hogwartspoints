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
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
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
    }
</style>