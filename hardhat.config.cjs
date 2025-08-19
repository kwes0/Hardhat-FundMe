require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    namedAccounts:{
        deployer:{ // This is used to set a default deployer relatve to the deploy anonymous func
            default: 0, //Sets the the account from the list of accounts provided.
            31337: 1, //Choose the position of the chain
        }
    }
}
