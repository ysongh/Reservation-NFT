var ReservationNFT = artifacts.require('ReservationNFT')

module.exports = function(deployer) {
  deployer.deploy(ReservationNFT)
}