const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config({path: '.env'});

// Create connection to DataHub Celo Network node
const web3 = new Web3(process.env.REST_URL);
const client = ContractKit.newKitFromWeb3(web3);

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

client.addAccount(account.privateKey);

module.exports = {
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    alfajores: {
      provider: client.connection.web3.currentProvider, // CeloProvider
      network_id: 44787  // latest Alfajores network id
    }
  },
  contracts_build_directory: './server/abis/',
  compilers: {
    solc: {
      version: "0.6.12"
    },
  },
};