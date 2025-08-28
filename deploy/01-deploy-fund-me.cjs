//const { getNamedAccounts, deployments, config } = require("hardhat");

// Deploy Function Type 1
/*
Another way to write deploy function script - An anonymous async function
    module.exports = async({getNamedAccounts, deployments, getChainId, getUnnamedAccounts,})=>{
        const {deploy} = deployments; 
        const {deployer} = await getNamedAccounts();

        await deploy("ContractName", {
        from: deployer, 
        gasLimit:4000000, 
        args:[],
        })
        }
*/

//Deploy function type 2
/*
module.exports = async (hre) => {
    //Pull out values from hre while running the function
    const {getNamedAccounts, deployments} = hre
    // we can also pull the above values as arguements in the async function. See the example below setup

    //get values from the getNamedAccounts() and deployments
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts
}

*/

const {
    networdConfig,
    developmentChain,
} = require("../helper-hardhat-config.cjs")
const { network } = require("hardhat")

//Deploy function type 3 with syntax sugar
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments //This two functions are being grabbed from deployments which is being grabbed from HRE
    const { deployer } = await getNamedAccounts() //NamedAccounts are defined in the config to give a specific account, a specific number that can be called.
    const chainId = network.config.chainId

    // A file assigning price feed address to network in order to be dynamic
    // const ethUsdPriceFeedAddr = networdConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddr
    if (developmentChain.includes(chainId)) {
        const ethUsdAggregator = await get("MockV3Aggregator")
        ethUsdPriceFeedAddr = ethUsdAggregator.address //because if deployed on local, deploy mock will be triggered. so we grab that here as well.
    } else {
        ethUsdPriceFeedAddr = networdConfig[chainId]["ethUsdPriceFeed"]
    }

    // if contract doesn't exist, we deploy a mini one for local testing

    //Deploying the contract - deploy takes name and a list of overrides
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddr], //Anything necessary to deploy the code such as price feed
        log: true,
    })
    log("---------------------------------------------------------------------------")
}

module.exports.tags = ["all", "FundMe"]

//yarn hardhat deploy will capture everything and also stick it to the local node which is also hardhat 
