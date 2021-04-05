const express = require('express');
const router = express.Router();
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config();

// GET /api/blockchain/connect
// Connecting to the Celo Network
router.get('/connect', async (req, res, next) => {
    try{
        // Create a connection to DataHub Celo Network node
        const web3 = new Web3(process.env.REST_URL);
        const client = ContractKit.newKitFromWeb3(web3);

        console.log(client);

        const chainId = await web3.eth.getChainId()
            .catch((err) => { throw new Error(`Could not get chain id: ${err}`); });

        const height = await web3.eth.getBlockNumber()
            .catch((err) => { throw new Error(`Could not get block height: ${err}`); });

        return res.status(200).json({
            'ChainId': chainId,
            'Block height': height,
            'Message': 'Successfully connected to Celo Network'
        });
    } catch(err){
        console.error(err);
    }
});

// POST /api/blockchain/create-account
// Creating a Celo account
router.post('/create-account', async (req, res, next) => {
    try{
        // Create a connection to DataHub Celo Network node
        const web3 = new Web3(process.env.REST_URL);

        const account =  web3.eth.accounts.create();

        return res.status(200).json({
            'Address': account.address,
            'PrivateKey': account.privateKey,
            'Message': 'Created a Celo account'
        });
    } catch(err){
        console.error(err);
    }
});

module.exports = router;