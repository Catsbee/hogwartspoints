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
    }
    next()
}))

router.post('/self', ((req, res) => {
    res.json({user : req.session.userId});
}))

router.post('/register',  ( async(req, res) => {
    let input = {
        username : req.body.username,
        password : await bcrypt.hash(req.body.password,10),
        userhouse : req.body.userhouse,
        prof : req.body.prof
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
        res.json({message : "Username non existant"})
        return
    }
    if (!await bcrypt.compare(req.body.password, test.rows[0].password))
    {
        res.json({message : "Mauvais password"})
        return
    }
    if (req.session.userId >= 0){
        res.json({message : "Utilisateur deja connecte"})
        return
    }
    req.session.userId = test.rows[0].userid
    res.json({message : "Utilisateur connecte"})
}))

router.post('/logout', ((req, res) => {
    if( req.session.userId === -1){
        res.json({message : "Pas d'utilisateurs connectes"})
        return
    }
    req.session.userId = -1
    res.json({message : "Utilisateur deconnecte"})
}))


module.exports = router