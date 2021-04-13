const express = require('express');
const router = express.Router();
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

const Event = require('../models/Event');
const ReservationNFT = require('../abis/ReservationNFT.json');

// GET /api/event/events
// Find all events
router.get('/events', async (req, res) => {
    try{
        const events = await Event.find();

        return res.status(200).json({
            data: events,
            count: events.length
        });
    } catch(err){
        console.error(err);
    }
});

// POST /api/event/create-event
// Create a new event
router.post('/create-event', async (req, res) => {
    try{
        const newEvent = {
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            poster: req.body.poster,
        };

        const dataEvent = await Event.create(newEvent);

        return res.status(201).json({ data: dataEvent });
    } catch(err){
        console.error(err);
    }
});

// GET /api/event/detail/:eventId
// Find more detail about an event
router.get('/detail/:eventId', async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        return res.status(200).json({
            data: event
        });
    } catch(err){
        console.error(err);
    }
});

// POST /api/event/mintnft/:eventId
// Reserve an event and mint NFT
router.post('/mintnft/:eventId', async (req, res, next) => {
    try{
        const privateKey = req.body.privateKey;
        const eventId = req.params.eventId;

        const web3 = new Web3(process.env.REST_URL);
        const client = ContractKit.newKitFromWeb3(web3);

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        client.addAccount(account.privateKey);

        const networkId = await web3.eth.net.getId();

        const deployedNetwork = ReservationNFT.networks[networkId];

        if (!deployedNetwork) {
            throw new Error(`${networkId} is not valid`);
        }

        let instance = new web3.eth.Contract(
            ReservationNFT.abi,
            deployedNetwork.address
        );

        const txObject = await instance.methods.mintNFT(eventId);
        let tx = await client.sendTransactionObject(txObject, { from: account.address });

        let receipt = await tx.waitReceipt();

        return res.status(201).json({
            data: receipt
        });
    } catch(err){
        console.error(err);
    }
});

module.exports = router; 