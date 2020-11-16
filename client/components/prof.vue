<template>
    <div class="container">
        <input type="text" v-model="tache.tachenom">
        <input type="text" v-model="tache.tachedes">
        <input type="number" v-model="tache.tachepoints">
        <button @click="newtache">Valider</button>
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
                }
            }
        },
        methods :{
            newtache(){
                this.$emit('newtache',  this.tache.tachedes,this.tache.tachenom, this.tache.tachepoints);
            }
        }
    }
</script>