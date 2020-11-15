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