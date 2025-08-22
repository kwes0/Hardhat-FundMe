const { network } = require("hardhat")
const {
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config.cjs")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //This deploy should only work if this is deployed to a local network
    if (developmentChain.includes(chainId)) {
        log("Naona mockre inachezewa nditini...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mockre imeiva mse!")
        log("-------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"] //This is ensures that we can tag to only run the mock scripts
//yarn hardhat deploy --tags mocks
