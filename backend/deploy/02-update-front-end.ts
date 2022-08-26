import { deployments, ethers } from "hardhat"
import {network} from "hardhat";

// const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")

const fs = require("fs")
const frontEndContractsFile = "../utils/contractAddresses.json"
const frontEndAbiFile = "../utils/abis.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("")
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const BitStackerNFT = await deployments.get("BitStackerNFT");

    fs.writeFileSync(frontEndAbiFile, JSON.stringify(
        {
            BitStackerNFT: BitStackerNFT.abi,
        }
        ))
}

async function updateContractAddresses() {
    const chainId = network.config.chainId;
    const BitStackerNFT = await deployments.get("BitStackerNFT");

    let contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    contractAddresses = {
        BitStackerNFT: BitStackerNFT.address,
        chainId: chainId
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]