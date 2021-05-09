const express = require('express'); 
const mongoose = require('mongoose');

const router = new express.Router(); 

const CollageSchema = new mongoose.Schema({
    firstBook: {
        author: String,
        title: String,
        yearPublished: Number,
        cover: String,
    },
    secondBook: {
        author: String,
        title: String,
        yearPublished: Number,
        cover: String,
    },
    thirdBook: {
        author: String,
        title: String,
        yearPublished: Number,
        cover: String,
    },
    fourthBook: {
        author: String,
        title: String,
        yearPublished: Number,
        cover: String,
    },
    user: String,
    title: String,
    description: String,
    id: Number
})

const Collage = new mongoose.model('Collage', CollageSchema);

router.get('/', async (req, res) => {
    try {
        const collages = await Collage.find(); 
        res.json(collages); 
    } catch (error) {
        console.log(error.message); 
    }
})

router.get('/:user', async (req, res) => {
    try {
        const collages = await Collage.find({user: req.params.user});
        res.json(collages); 
    } catch (error) {
        console.log(error.message); 
    }
})

router.get('/:user/:id', async (req, res) => {
    try {
        const collage = await Collage.find({user: req.params.user, id: req.params.id});
        res.json(collage); 
    } catch (error) {
        console.log(error.message); 
    }
})

router.post(':user', async (req, res) => {
    try { 

        const collage = new Collage({
            firstBook: req.body.firstBook,
            secondBook: req.body.secondBook,
            thirdBook: req.body.thirdBook, 
            fourthBook: req.body.fourthBook,
            user: req.body.user,
            title: req.body.title, 
            id: req.body.id,
            description: req.body.description
        })

        await collage.save();
        res.send("CREATED COLLAGE");  
    } catch (error) {
        console.log(error.message); 
    }
})

module.exports = router; 