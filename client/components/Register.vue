<template>
    <div class="reg">
        <div class="jumbotron jumbotron-fluid changeReg text-center">
            <div class="container">
                <div id="titre">
                    <h1>Vous avez reçu votre lettre</h1>
                    <h3>Veuillez vous inscrire ou vous connecter</h3>
                </div>

            </div>
        </div>
        <div class="container ">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="col-md-6">
                        <div id="signin">
                            <form>
                                <div class="form-group">
                                    <h2>Sign in</h2>
                                    <label for="nom1">Nom</label>
                                    <input type="email" class="form-control" id="nom1" aria-describedby="nameHelp">
                                    <small id="namelHelp" class="form-text text-muted">Veuillez rentrer votre prénom suivit de votre nom. Exemple "Harry Potter"</small>
                                </div>
                                <div class="form-group">
                                    <label for="Password1">Mot de passe</label>
                                    <input type="password" class="form-control" id="Password1">
                                </div>
                                <button @click="connect" class="btn btn-outline-info">Se connecter</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="signup">
                            <form>
                                <div class="form-group">
                                    <h2>Sign Up</h2>
                                    <label for="nom2">Nom</label>
                                    <input type="email" class="form-control" id="nom2" aria-describedby="nameHelp">
                                    <small id="nameHelp" class="form-text text-muted">Veuillez rentrer votre prénom suivit de votre nom. Exemple "Harry Potter"</small>
                                </div>
                                <div class="form-group">
                                    <label for="maison">Maison</label>
                                    <select class="form-control" id="maison">
                                        <option>Poufsouffle</option>
                                        <option>Serpentard</option>
                                        <option>Serdaigle</option>
                                        <option>Gryffondor</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <select class="form-control" id="role">
                                        <option>Professeur</option>
                                        <option>Elève</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="Password2">Password</label>
                                    <input type="password" class="form-control" id="Password2">
                                </div>
                                <button @click="register" class="btn btn-outline-info">S'enregistrer</button>
                            </form>
                            <p><br></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    module.exports = {
        methods:{
            register(){
                let nomRegister = document.getElementById('nom2').value;
                let maison = document.getElementById('maison').value;
                let role = document.getElementById('role').value;
                let password = document.getElementById('Password2').value;
                this.$emit('register', nomRegister, password, maison, role);
            },
            connect(){
                let nomConnect = document.getElementById('nom1').value;
                let password = document.getElementById('Password1').value;
                this.$emit('connect', nomConnect, password);
            }
        }
    }
</script>

<style>
    .changeReg{
        background-image:url("../assets/header_register.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
    #titre{
        color:white;
        text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
    }
    .reg{
        background-image:url("../assets/fond_papyrus.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
