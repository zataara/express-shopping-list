const express = require('express');
const router = new express.Router();
const items = require('./fakeDb')
const ExpressError = require('./expressError')
const Item = require('./item')

router.get('/', (req, res) => {
    res.json({ ...items})
})

router.post('/', (req, res, next) => {
    try {
        if (!req.body.name) throw new ExpressError("Name is required", 400);
        if (!req.body.price) throw new ExpressError("Price is required", 400);
        const newItem = new Item(req.body.name, req.body.price)
        items.push(newItem);
        return res.status(201).json( { item: newItem } );
    } catch(e) {
        return next(e);
    }
    
})

router.get('/:name', (req, res) => {
    const item = items.find(item => item.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    res.json({item: item})
})

router.patch('/:name', (req, res) => {
    const item = items.find(item => item.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    item.name = req.body.name;
    item.price = req.body.price;
    res.json({item: item})
})

router.delete('/:name', (req, res) => {
    const item = items.findIndex(item => item.name === req.params.name)
    if (item ===  -1) {
        throw new ExpressError('Item not found', 404)
    }
    items.splice(item,1)
    res.json({message: 'Item Deleted'})
})


module.exports = router;