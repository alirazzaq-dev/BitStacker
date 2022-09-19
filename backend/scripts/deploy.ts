// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { deployments, ethers } from "hardhat";
import { BitStackerNFT } from "../typechain-types";

async function main() {

  const [deployer, user1, user2] = await ethers.getSigners();


  const BitStackerNFT = await deployments.get("BitStackerNFT");

  const bitStackerNFT = new ethers.Contract(
    BitStackerNFT.address,
    BitStackerNFT.abi,
    deployer
  ) as BitStackerNFT;

  const tx = await bitStackerNFT.whiteListUsers([deployer.address]);
  await tx.wait(1);

  console.log("User whitelisted", deployer.address);
  



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
