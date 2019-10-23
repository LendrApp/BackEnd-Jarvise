const express = require('express');
const router = express.Router();

const Items = require('./item-model')

//GET Request
 router.get('/', (req, res) => {
    Items.find()
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The item information could not be retrieved.'                      
            });
        });
});

//GET Request with certain item
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Items.finItemsyId(id)
        .then(item => {
            if(item) {
                res.json(item)
            } 
            else {
                res.status(404).json({
                    message: 'The item with the specified ID does not exist.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The item information could not be retrieved.'
            });
        });
});

//POST Request
router.post('/', (req, res) => {
    const {name, description, price} = req.body;
    Items.insert(req.body)
        .then(item => {
            if(item) {
                res.status(201).json(item);
            }
            else {
                res.status(400).json({
                    message: 'Please provide a name and bio for the item.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'There was an error saving item to the database.'
            });
        });
});

//PUT Request
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name, description, price} = req.body;
    if(name && description && price) {
        Items.update(id, req.body)
            .then(updateditem => {
                if(updateditem) {
                    res.status(200).json(updateditem);
                }
                else {
                    res.status(404).json({
                        message: 'The item with the specified ID does not exist.'
                    });
                };
            })
            .catch(err => {
                res.status(500).json({
                    err: err,
                    message: 'The item information could not be modified.'
                });
            });
    }
    else {
        res.status(400).json({
            message: 'Please provide a name and bio for the item.'
        });
    };
});

//DELETE Request
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Items.remove(id)
        .then(item => {
            if(item) {
                res.status(200).json(item);
            }
            else {
                res.status(404).json({
                    message: 'The item with the specified ID does not exist.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The item could not be removed.'
            })
        })
})

module.exports = router;