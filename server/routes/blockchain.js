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

        return res.status(201).json({
            'Address': account.address,
            'PrivateKey': account.privateKey,
            'Message': 'Created a Celo account'
        });
    } catch(err){
        console.error(err);
    }
});

// PUT /api/blockchain/getbalance
// Get balance of your Celo account
router.put('/getbalance', async (req, res, next) => {
    try{
        const privateKey = req.body.privateKey;

        const web3 = new Web3(process.env.REST_URL);
        const client = ContractKit.newKitFromWeb3(web3);

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        const accountBalances = await client.getTotalBalance(account.address)
            .catch((err) => { throw new Error(`Could not fetch account: ${err}`); });

        return res.status(200).json({
            'CELO_balance': accountBalances.CELO.toString(10),
            'cUSD_balance': accountBalances.cUSD.toString(10),
            'Locked_CELO_balance': accountBalances.lockedCELO.toString(10),
            'Pending_balance': accountBalances.pending.toString(10)
        });
    } catch(err){
        console.error(err);
    }
});

// PUT /api/blockchain/transfer-celo
// Transfer CELO to other Celo account
router.put('/transfer-celo', async (req, res, next) => {
    try{
        const privateKey = req.body.privateKey;
        const recipientAddress = req.body.recipientAddress;
        const amount = req.body.amount;

        const web3 = new Web3(process.env.REST_URL);
        const client = ContractKit.newKitFromWeb3(web3);

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        client.addAccount(account.privateKey);

        const goldtoken = await client.contracts.getGoldToken();

        const celotx = await goldtoken.transfer(recipientAddress, amount).send({from: account.address})
            .catch((err) => { throw new Error(`Could not transfer CELO: ${err}`) });

        const celoReceipt = await celotx.waitReceipt();

        return res.status(200).json({
            'CELO_Transaction_receipt': celoReceipt
        });
    } catch(err){
        console.error(err);
    }
});

module.exports = router;