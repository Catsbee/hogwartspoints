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

router.get('/getTache', async(req,res)=>{
    let result=await client.query('SELECT * FROM taches')
    res.json(result.rows)
})

module.exports = router