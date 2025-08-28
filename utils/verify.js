const { run } = requuire("hardhat")

const verify = async (contractAddress, args) => {
    console.log("Na sukuma code, ya kukembwa baadae...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Ilisha kembwa, mambo ni vulai")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
