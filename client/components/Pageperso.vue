<template>

    <div class="container">
        <div class="row">
            <button @click="logout" class="btn btn-outline-info">Se tej</button>
        </div>

        <h2><br>Bienvenue user.username</h2>
        <h2><br>Tableau personnel</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Tâche</th>
                <th scope="col">Description</th>
                <th scope="col">Points</th>
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


        <form>
            <div class="form-row">
                <div class="col">
                    <input type="text" class="form-control" id="nomtache" placeholder="Nom de la tache">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="descriptiontache" placeholder="Description de la tache">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="pointstache" placeholder="Points attribuer">
                </div>
                <div class="col">
                    <button @click="newtache" class="btn btn-outline-info">Créer</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    module.exports = {
        methods:{
            logout(){
                this.$emit('logout');
            }
        }
    }
</script>