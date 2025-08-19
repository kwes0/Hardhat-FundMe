/*
Traditional deploying steps
    - import contract
    - main function
    - calling of main function

With hardhat-deploy:
    - importing
    - a function to handle deployment which is exported as the default function for hardhat deploy to look for
    function deployFunc(hre){}
    module.exports.default = deployFunc
*/

const { getNamedAccounts, deployments, config } = require("hardhat");

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

//Deploy function type 3
module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments; //This two are being grabbed from deployments which is being grabbed from HRE
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId
}