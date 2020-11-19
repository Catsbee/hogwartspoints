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
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
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
    }
</style>