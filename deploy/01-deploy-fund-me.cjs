module.exports = async (hre) => {
    //Pull values from hre
    const {getNamedAccounts, deployments} = hre
    // we can also pull the above values as arguements in the async function. See the example below setup

    //get values from the getNamedAccounts() and deployments
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts
}


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
