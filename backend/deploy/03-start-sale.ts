import {ethers, network} from "hardhat";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import { text } from "stream/consumers";
import { BitStackerNFT } from "../typechain";
// import { time } from "@nomicfoundation/hardhat-network-helpers";
// import { StakingPoolFactory, StakingToken } from "../typechain";
// import {verify} from "../utils/verify"

// function sleep(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

module.exports = async ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) => {
    // const {deployer}  = await getNamedAccounts()
    // const singer = await ethers.getSigner(deployer);
    const [deployer, user1, user2] = await ethers.getSigners();


    // const BitStackerNFT = await deployments.get("BitStackerNFT");

    // const bitStackerNFT = new ethers.Contract(
    //     BitStackerNFT.address, 
    //     BitStackerNFT.abi, 
    //     deployer
    // ) as BitStackerNFT;

    // const tx = await bitStackerNFT.setSaleType(1);
    // await tx.wait(1);
    // console.log("Private minting begin...")


    // const tx2 = await bitStackerNFT.mint(0, 10, {bitCoinAddress: "123456", emailAddress: "ali@gmail.com"}, 
    // {value: ethers.utils.parseEther("20")});
    // await tx2.wait(1);


    // const tx3 = await bitStackerNFT.mint(1, 15, {bitCoinAddress: "123456", emailAddress: "ali@gmail.com"}, 
    // {value: ethers.utils.parseEther("20")});
    // await tx3.wait(1);


    // const tx0 = await bitStackerNFT.setSaleType(2);
    // await tx0.wait(1);


    // const tx4 = await bitStackerNFT.mint(2, 10, {bitCoinAddress: "123456", emailAddress: "ali@gmail.com"}, 
    // {value: ethers.utils.parseEther("20")});
    // await tx4.wait(1);


    // const tx5 = await bitStackerNFT.mint(3, 10, {bitCoinAddress: "123456", emailAddress: "ali@gmail.com"}, 
    // {value: ethers.utils.parseEther("20")});
    // await tx5.wait(1);


    // console.log("Tokens minted...")




  }