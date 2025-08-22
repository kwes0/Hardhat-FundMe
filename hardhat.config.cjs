//Importations
require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */

//Define our projects and some of the requirements

module.exports = {
    solidity: "0.8.19", //Should be the same as in the contracts defined
    defaultNetwork: "hardhat", //
    namedAccounts: {
        deployer: { //How to define named accounts. You can call in the deploy function.
            default: 0, //Sets the the account from the list of accounts provided.
            31337: 1, //Choose the position of the chain
        },
    },
}
