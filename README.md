# Reservation-NFT
An app where people can reserve a spot at the event and earn NFT which is used as proof of reservation for the event

- Demo - https://youtu.be/pLlFuPBic_Y
- Design - https://www.figma.com/file/qcb7tKORA1WrNlFTm6UJ4P/reservation-nft?node-id=0%3A1
- Try the app with Expo Go - https://expo.io/@ysongh/projects/reservation-nft

## Features
- Event host can create an event
- Images are store on Pinata
- User reserve a spot at the event and earn NFT
- User show the QR code when they tap on the NFT to the event host
- Event host scan QR code of the NFT to confirm that they reserve a spot at the event

## Technologies
- React Native
- Node.js
- MongoDB
- Solidity
- Openzeppelin/contracts ERC721.sol
- celo/contractkit
- Pinata

## Project setup
- Clone or download this repository
- Run npm i to install the dependencies
- Create a file called 'config.js' on the src folder and add the following code
```
export const pinataApiKey = "Create API key from Pinata";
export const pinataSecretApiKey = "Create API key from Pinata";
```
- Open up Ganache and click "Quickstart"
- Run `truffle migrate --network alfajores` to deploy the contract
- Run `npm start` to start the app