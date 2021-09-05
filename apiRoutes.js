const express = require('express');
const router = new express.Router();
const items = require('./fakeDb')

router.get('/items', (req, res) => {
    res.json({ ...items})
})

router.post('/items', (req, res) => {
    res.json({ users: USERS })
})

router.get('/items/:name', (req, res) => {
    res.json({ users: USERS })
})

router.patch('/items/:name', (req, res) => {
    res.json({ users: USERS })
})

router.delete('/items/:name', (req, res) => {
    res.json({ users: USERS })
})


module.exports = router;