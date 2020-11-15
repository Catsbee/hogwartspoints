<template>
    <div class="container">
        <div class="row">
            <h1>Bienvenue chère élèves et profeesseur dans le conteur de points Poudlard !</h1>
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
        <div class="row">
            <article class="col-xs-12 col-sm-12 col-md-3 col-md-3">
                <h2>Poufsouffle</h2>
                <p>Equilibre, Loyauté, Constance, Patiance</p>
            </article>
            <article class="col-xs-12 col-sm-12 col-md-3 col-md-3">
                <h2>Serdaigle</h2>
                <p>Sagesse, Discernement, Erudition, Curiosité</p>
            </article>
            <article class="col-xs-12 col-sm-12 col-md-3 col-md-3">
                <h2>Serpentard</h2>
                <p>Malice, Adresse, Détermination</p>
            </article>
            <article class="col-xs-12 col-sm-12 col-md-3 col-md-3">
                <h2>Gryffondor</h2>
                <p>Courage, Hardiesse, Force d'Esprit</p>
            </article>
        </div>
        <div class="row">
            <h2>Classement des équipe</h2>
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

        </div>
        <div class="row">
            <h2>Liste des tâche</h2>
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>points</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

</script>