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

module.exports = router