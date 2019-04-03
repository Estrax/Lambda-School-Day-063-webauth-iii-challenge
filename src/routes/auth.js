require('dotenv').config();
const router = require('express').Router();
const db = require('../database/helpers/helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/register')
    .post(async (req, res) => {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 12);
        await db
                .addUser(user)
                .then(id => {
                    res
                        .status(201)
                        .json({id});
                })
                .catch(err => {
                    res
                        .status(500)
                        .json("There was an error saving user to the database!");
                });
    });

router.route('/login')
    .post(async (req, res) => {
        const userData = req.body;
        await db
                .getUserByUsername(userData.username)
                .then(user => {
                    if(user && bcrypt.compareSync(userData.password, user.password)){
                        const token = generateToken(userData);
                        console.log(token);
                        res
                            .status(200)
                            .json({ token });
                    }else{
                        res
                            .status(404)
                            .json({ message: 'You shall not pass'});
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ err });
                });
    });

function generateToken(userData){
    const payload = {
        subject: userData.id,
        username: userData.username,
        department: userData.department
    };

    const options = {
        expiresIn: '1d'
    };
    
    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

module.exports = router;