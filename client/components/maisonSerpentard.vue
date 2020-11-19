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
                    </div>
                </div>

            </div>
        </div>
    </div>


</template>

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
    }

</style>