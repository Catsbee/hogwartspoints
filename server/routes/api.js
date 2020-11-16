const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'Snape',
    host: 'localhost',
    password: 'Severus',
    database: 'HogwartsProject'
})

client.connect()

router.use(((req, res, next) => {
    if (typeof req.session.userId === 'undefined')
    {
        req.session.userId = -1;
        req.session.prof = false;
    }
    next()
}))

router.get('/self', (async(req, res) => {
    let user = await client.query({text: 'SELECT * FROM users WHERE userid=$1', values:[req.session.userId]})
    res.json({user : user.rows});

}))

router.get('/isprof', (req,res)=>{
    res.json(req.session.prof)
})

router.post('/register',  ( async (req, res) => {
    let input = {
        username : req.body.username,
        password : await bcrypt.hash(req.body.password,10),
        userhouse : req.body.userhouse,
        prof : req.body.prof==='Professeur'
    }
    let test = await client.query({
        text:'SELECT * FROM users WHERE username=$1',
        values:[input.username]
    })
    if (test.rows.length > 0){
        res.json({message : "username non disponible"})
        return
    }
    let number = await client.query({
        text:'SELECT * FROM users'
    })
    let result = await client.query({
        text:'INSERT INTO users (username, userhouse, password, prof, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values:[input.username, input.userhouse, input.password, input.prof, number.rows.length]
    })
    res.json(result.rows)
}))

router.post('/connect',(async (req, res) => {
    let input = {
        username : req.body.username,
        password : req.body.password
    }
    let test = await client.query({
        text:'SELECT * FROM users WHERE username=$1',
        values:[input.username]
    })
    if (test.rows.length === 0){
        res.json({message : "Username non existant", success:false})
        return
    }
    if (!await bcrypt.compare(req.body.password, test.rows[0].password))
    {
        res.json({message : "Mauvais password", success:false})
        return
    }
    if (req.session.userId >= 0){
        res.json({message : "Utilisateur deja connecte", success:true})
        return
    }
    req.session.userId = test.rows[0].userid
    req.session.prof=test.rows[0].prof
    res.json({message : "Utilisateur connecte", success:true})
}))

router.post('/logout', ((req, res) => {
    if( req.session.userId === -1){
        res.json({message : "Pas d'utilisateurs connectes"})
        return
    }
    req.session.userId = -1
    res.json({message : "Utilisateur deconnecte"})
}))

router.get('/eleve', (async (req, res) =>{
    let user = await client.query({text: 'SELECT * FROM users WHERE prof=$1', values:[false]})
    res.json(user.rows)
}))

router.post('/newtache', (async(req, res)=>{
    let input = {
        description : req.body.tachedes,
        nomtache : req.body.tachenom,
        points : req.body.tachepoints
    }
    let test = await client.query({
        text:'SELECT * FROM taches WHERE tachenom=$1',
        values:[input.nomtache]
    })
    if (test.rows.length > 0){
        res.json({message : "Tache déjà créer"})
        return
    }
    let number = await client.query({
        text:'SELECT * FROM taches'
    })
    let result = await client.query({
        text:'INSERT INTO taches (tachedes, tachenom, tachepoints, tacheid) VALUES ($1, $2, $3, $4) RETURNING *',
        values:[input.description, input.nomtache, input.points, number.rows.length]
    })
    res.json(result.rows)
}))

router.put('/assignTache', async(req, res)=>{
    //verification si c'est bien le prof de connecte
    if (!req.session.prof){
        res.json({message : 'erreur : seul un enseignant peut faire cette operation'})
        return
    }
    let input = {
        username : req.body.username,
        tacheid : req.body.tacheid.toString()
    }
    console.log(input)
    //verification existance utilisateur
    let user = await client.query({
            text : 'SELECT * FROM users WHERE username=$1',
            values : [input.username]
    })
    if(user.rows.length === 0){
        res.json({message : 'erreur : utilisateur non existant'})
        return
    }
    //verification existance tache
    let task = await client.query({
        text : 'SELECT * FROM taches WHERE tacheid=$1',
        values : [input.tacheid]
    })
    if (task.rows.length === 0){
        res.json({message : 'erreur : tache non existante'})
        return
    }
    //append la tache au tableau de taches
    if (user.rows[0].taches === null)
    {
        user = await client.query({
            text : "UPDATE users SET taches = '{}' WHERE username=$1 RETURNING *",
            values : [input.username]
        })
    }
    else
    {
        for (let i = 0; i < user.rows[0].taches.length; i++){
            if (user.rows[0].taches[i].toString() === input.tacheid.toString()){
                res.json({message : "erreur : tache deja assignee a l'utilisateur selectionne"})
                return
            }
        }
    }
    user = await client.query({
        text : "UPDATE users SET taches = array_append(taches,$1) WHERE username=$2 RETURNING *",
        values : [input.tacheid, input.username]
    })
    res.json({message : "Tache correctement assignee"})
})

router.post('/getUser', async (req, res)=>{
    let input = {
        userid : req.body.userid
    }
    let user = await client.query({
        text : 'SELECT * FROM users WHERE userid=$1',
        values : [input.userid]
    })
    if(user.rows.length === 0){
        res.json(null)
        return
    }
    let tasks = []
    let total = 0
    if (user.rows[0].taches === null) {
        res.json({tasks : tasks, total: total})
        return
    }
    let tache = null
    for (let i = 0; i < user.rows[0].taches.length; i++){
        tache = await client.query({
            text : 'SELECT * FROM taches WHERE tacheid=$1',
            values : [user.rows[0].taches[i]]
        })
        if (tache.rows.length !== 0){
            tasks.push(user.rows[0].taches[i])
            total += tache.rows[0].tachepoints
        }
    }
    res.json({tasks : tasks, total: total})
})

router.get('/getTache', async(req,res)=>{
    let result=await client.query('SELECT * FROM taches')
    res.json(result.rows)
})

router.get('/housepoints', async(req, res)=>{
    let gryf = await client.query("SELECT * FROM users WHERE userhouse='Gryffondor'")
    let serd = await client.query("SELECT * FROM users WHERE userhouse='Serdaigle'")
    let poufs = await client.query("SELECT * FROM users WHERE userhouse='Poufsouffle'")
    let serp = await client.query("SELECT * FROM users WHERE userhouse='Serpentard'")

    let gryfPoint = 0
    let  serdPoint = 0
    let poufPoint = 0
    let serpPoint = 0
    let tache = null

    for (let i = 0; i < gryf.rows.length; i++){
        if (gryf.rows[i].taches !== null) {
            for (let j = 0; j < gryf.rows[i].taches.length; j++){
                tache = await client.query({
                    text : "SELECT * FROM taches WHERE tacheid=$1",
                    values : [gryf.rows[i].taches[j]]
                })
                gryfPoint += tache.rows[0].tachepoints
            }
        }
    }
    for (let i = 0; i < serd.rows.length; i++){
        if (serd.rows[i].taches !== null) {
            for (let j = 0; j < serd.rows[i].taches.length; j++) {
                tache = await client.query({
                    text: "SELECT * FROM taches WHERE tacheid=$1",
                    values: [serd.rows[i].taches[j]]
                })
                serdPoint += tache.rows[0].tachepoints
            }
        }
    }
    for (let i = 0; i < poufs.rows.length; i++){
        if (poufs.rows[i].taches !== null)
        {
            for (let j = 0; j < poufs.rows[i].taches.length; j++){
                tache = await client.query({
                    text : "SELECT * FROM taches WHERE tacheid=$1",
                    values : [poufs.rows[i].taches[j]]
                })
                poufPoint += tache.rows[0].tachepoints
            }
        }

    }
    for (let i = 0; i < serp.rows.length; i++){
        if (serp.rows[i].taches !== null) {
            for (let j = 0; j < serp.rows[i].taches.length; j++) {
                tache = await client.query({
                    text: "SELECT * FROM taches WHERE tacheid=$1",
                    values: [serp.rows[i].taches[j]]
                })
                serpPoint += tache.rows[0].tachepoints
            }
        }
    }
    res.json({
            gryffondor : gryfPoint,
            serdaigle:serdPoint,
            serpentard:serpPoint,
            poufsouffle:poufPoint
    })
})



module.exports = router