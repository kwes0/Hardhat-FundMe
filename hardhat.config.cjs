//Importations
require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

//Define our projects and some of the requirements

//RPC_URLs
const LH_RPC_URL = process.env.LOCALHOST_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

// PRIVATE_KEYs
const LH_PVT_KEY = process.env.LOCALHOST_PRIVATE_KEY
const SEPOLIA_PVT_KEY = process.env.SEPOLIA_PRIVATE_KEY

//API_KEYS
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    // solidity: "0.8.19", //Should be the same as in the contracts defined
    solidity: {
        compilers: [
            //an array of versions
            { version: "0.8.19" },
            { version: "0.6.6" },
        ],
    },
    defaultNetwork: "hardhat", //
    namedAccounts: {
        deployer: {
            //How to define named accounts. You can call in the deploy function.
            default: 0, //Sets the the account from the list of accounts provided.
            31337: 1, //Choose the position of the chain
        },
    },
    networks: {
        localhost: {
            url: LH_RPC_URL,
            // accounts:[],
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PVT_KEY],
            chainId: 11155111,
            blcokConfirmations: 6, //This has been added as a wait(). Also in reflected in deploy script.
            //Above is to allow the network to index our block
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputfile: "gasReporter.txt",
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        etherscan: ETHERSCAN_API_KEY,
    },
}
