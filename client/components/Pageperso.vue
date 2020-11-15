<template>
    <div class="container">
        <div class="row">
            <button @click="logout" class="btn btn-outline-info">Se tej</button>
        </div>
        <h2>Classement des équipe</h2>
        <h2>Liste des tâche</h2>

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