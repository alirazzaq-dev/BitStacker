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


    const BitStackerNFT = await deployments.get("BitStackerNFT");

    const bitStackerNFT = new ethers.Contract(
        BitStackerNFT.address, 
        BitStackerNFT.abi, 
        deployer
    ) as BitStackerNFT;

    const tx = await bitStackerNFT.setSaleType(1);
    await tx.wait(1);
    console.log("Private minting begin...")

    // const StakingPoolFactory = await deployments.get("StakingPoolFactory");
    // const stakingPoolFactory = new ethers.Contract(
    //     StakingPoolFactory.address, 
    //     StakingPoolFactory.abi, 
    //     deployer
    // ) as StakingPoolFactory;

    
    // // Start A pool
    // const symbol = await stakingToken.symbol();
    // const decimals = await stakingToken.decimals();
    // const decimalsFactor = String(10**decimals);
    // const tokens = ethers.BigNumber.from("1000000").mul(decimalsFactor)
    // await stakingToken.mint(ethers.BigNumber.from("1000000").mul(decimalsFactor));
    // await stakingToken.connect(user1).mint(ethers.BigNumber.from("1000000").mul(decimalsFactor));
    // await stakingToken.mint(tokens);
    // await stakingToken.approve(stakingPoolFactory.address, tokens);
    
    // let latestBlock = await ethers.provider.getBlock("latest");

    // const tx = await stakingPoolFactory.createAStakingPool(
    //     // projectInfo 
    //     {
    //       name: "Awesome Staking Pool",
    //       symbol: "ASP",
    //       token: stakingToken.address,
    //       decimals: decimals,
    //       tokenSymbol: symbol,
    //       description: "The best project ever",
    //       projectCover: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c63a017911987.560b3fc509179.png",
    //       projectAvatar: "https://nftstorage.link/ipfs/bafkreifuugv3zrchpoem6an34zryuaioak6pzon3kxizjt2yaclpol5vky",
    //       socialHandles: {
    //         twitter: "",
    //         facebook: "",
    //         telegram: "",
    //         discord: ""
    //       }
    //     },
    //     // rewardPoolInfo
    //     {
    //       startedAt: latestBlock.timestamp + 1 * ONE_MINUTE,
    //       poolAmount: tokens,
    //       minimum: ethers.utils.parseEther("100"),
    //       maximum: ethers.utils.parseEther("1000000")
    //     },
    //     // images
    //     {
    //       image_3_months: "https://nftstorage.link/ipfs/bafkreifuugv3zrchpoem6an34zryuaioak6pzon3kxizjt2yaclpol5vky",
    //       image_6_months: "https://nftstorage.link/ipfs/bafkreifuugv3zrchpoem6an34zryuaioak6pzon3kxizjt2yaclpol5vky",
    //       image_12_months: "https://nftstorage.link/ipfs/bafkreifuugv3zrchpoem6an34zryuaioak6pzon3kxizjt2yaclpol5vky"
    //     }
    // );


    // await tx.wait(1);

    // console.log("STAKING pool has been created with token: ", stakingToken.address)

    // const poolsByTokenAddress = await stakingPoolFactory.getPoolsByTokenAddress(stakingToken.address);
    // console.log("poolsByTokenAddress: ", poolsByTokenAddress);


  }