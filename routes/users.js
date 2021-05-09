const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const router = new express.Router(); 

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    books: [{
        cover: String,
        title: String,
        author: String,
        description: String
    }],
})

const User = new mongoose.model('User', UserSchema);

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (error) {
        console.log(error.message); 
    }
})

router.get('/:name', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.name});
        res.json(user); 
    } catch (error) {
        console.log(error.message); 
    }
})

router.get('/:name/books', async (req, res) => {
    console.log("this is the method"); 
    try {
        const user = await User.findOne({username: req.params.name});
        console.log("books found"); 
        res.json(user.books); 
    } catch (error) {
        console.log(error.message); 
    }
})


router.post('/', async (req, res) => {
    try {

        let findUsername = User.findOne({username: req.body.username}, (err, data) => {
            if (err) {
                console.log(err.message); 
            }

            if (data !== null) {
                res.send("Username already in use"); 
                return; 
            }
        });


        const salt = await bcrypt.genSalt(); 
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);


        const user = new User({
            username: req.body.username,
            password: encryptedPassword, 
            books: []
        })

        await user.save();
        res.send("CREATED USER");
        console.log(res.body);   
    } catch (error) {
        console.log(error.message); 
    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username}, async (err, data) => {
            console.log(data); 
            if (data == null) {
                res.send("Username not found");
                return;  
            }

            const success = await bcrypt.compare(req.body.password, data.password);

            if (success) {
                res.send("Success"); 
            } else {
                res.send("Password Incorrect"); 
            };

        });
        

    } catch (error) {
        console.log(error.message); 
    }
})

router.post('/:name/books', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.name}, async (err, data) => {
            console.log(data); 
            if (data == null) {
                res.send("Username not found");
                return;  
            }
            data.books.push({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                cover: req.body.cover, 
            })
            await data.save(); 
            res.send("SUCCESS"); 

        });

    } catch (error) {
        console.log(error.message); 
    }
})

module.exports = router; 