const express = require('express');
const router = express.Router();
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

const User = require('../models/User');

// POST /api/user/register
// Create a new user
router.post('/register', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });

        if(user){
            return res.status(400).json({ errors: 'Email Already Exists' });
        }

        const web3 = new Web3(process.env.REST_URL);

        const account =  web3.eth.accounts.create();

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            walletAddress: account.address,
            privateKey: account.privateKey
        });

        const dataUser = await User.create(newUser);

        return res.status(200).json({ data: dataUser });
    } catch(err){
        console.error(err);
    }
});

// PUT /api/user/login
// Login the user
router.put('/login', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });

        if(!user){
            return res.status(400).json({ errors: 'Email not found' });
        }

        if(req.body.password != user.password){
            return res.status(400).json({ errors: 'Invalid email or password' });
        }

        const loginData = {
            email: user.email,
            walletAddress: user.walletAddress,
            privateKey: user.privateKey
        };

        return res.status(200).json({ data: loginData });
    } catch(err){
        console.error(err);
    }
});

module.exports = router;