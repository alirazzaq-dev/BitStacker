import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { BitStackerNFT, BitStackerNFT__factory } from "../typechain-types";
const provider = waffle.provider;


let deployer: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, user3: SignerWithAddress, user4: SignerWithAddress, user5: SignerWithAddress, user6: SignerWithAddress, user7: SignerWithAddress;
let bitStackerNFT: BitStackerNFT;


describe("BitStackerNFT Test Stack", function () {

  beforeEach(async () => {
    [deployer, user1, user2, user3, user4, user5, user6, user7] = await ethers.getSigners();
    const BitStackerNFT: BitStackerNFT__factory = await ethers.getContractFactory("BitStackerNFT");
    bitStackerNFT = await BitStackerNFT.deploy();
  });

  const mintFirstBatch = async (user: SignerWithAddress) => {
    await bitStackerNFT.setSaleType(1)

    await expect(() =>
      bitStackerNFT.connect(user).mint(0, 500, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("1000") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
    expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(0);
    expect(await bitStackerNFT.balanceOf(user.address, 0)).to.be.equal(500);
    expect(await bitStackerNFT.balanceOf(user.address, 1)).to.be.equal(0);
    expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(20_000);
    expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
    expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
    expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
    expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("1000"));

    await expect(() =>
      bitStackerNFT.connect(user).mint(1, 5000, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("1000") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
    expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000);
    expect(await bitStackerNFT.balanceOf(user.address, 0)).to.be.equal(500);
    expect(await bitStackerNFT.balanceOf(user.address, 1)).to.be.equal(5000);
    expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000);
    expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
    expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
    expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
    expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("2000"));

    await expect(bitStackerNFT.connect(user).mint(0, 1, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther(String(2)) })).to.be.reverted;
    await expect(bitStackerNFT.connect(user).mint(1, 1, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther(String(0.2)) })).to.be.reverted;


    await bitStackerNFT.setSaleType(2)

    await expect(() =>
      bitStackerNFT.connect(user).mint(2, 1000, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("1000") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
    expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(0);
    expect(await bitStackerNFT.balanceOf(user.address, 2)).to.be.equal(1000);
    expect(await bitStackerNFT.balanceOf(user.address, 3)).to.be.equal(0);
    expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000);
    expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(20_000);
    expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
    expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);
    expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("3000"));

    await expect(() =>
      bitStackerNFT.connect(user).mint(3, 5000, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("1000") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
    expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);
    expect(await bitStackerNFT.balanceOf(user.address, 2)).to.be.equal(1000);
    expect(await bitStackerNFT.balanceOf(user.address, 3)).to.be.equal(5000);
    expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000);
    expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000);
    expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
    expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);
    expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("4000"));

    await expect(bitStackerNFT.connect(user).mint(2, 1, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther(String(1)) })).to.be.reverted;
    await expect(bitStackerNFT.connect(user).mint(3, 1, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther(String(0.2)) })).to.be.reverted;

    expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
    expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
    expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
    expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);

    expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
    expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);

  }

  it("Deployes seccussfully", async function () {
    expect(bitStackerNFT.address).is.properAddress;
  });

  it("Initial Information is correct", async function () {

    const vipBlackToken = await bitStackerNFT.vipBlack();
    expect(vipBlackToken.id).to.be.equal(0);
    expect(vipBlackToken.hashRate).to.be.equal(40);
    expect(vipBlackToken.price).to.be.equal(ethers.utils.parseEther("2"));
    expect(vipBlackToken.terraHashedSold).to.be.equal(0);

    const vipBlueToken = await bitStackerNFT.vipBlue();
    expect(vipBlueToken.id).to.be.equal(1);
    expect(vipBlueToken.hashRate).to.be.equal(4);
    expect(vipBlueToken.price).to.be.equal(ethers.utils.parseEther("0.2"));
    expect(vipBlueToken.terraHashedSold).to.be.equal(0);

    const blackToken = await bitStackerNFT.black();
    expect(blackToken.id).to.be.equal(2);
    expect(blackToken.hashRate).to.be.equal(20);
    expect(blackToken.price).to.be.equal(ethers.utils.parseEther("1"));
    expect(blackToken.terraHashedSold).to.be.equal(0);

    const blueToken = await bitStackerNFT.blue();
    expect(blueToken.id).to.be.equal(3);
    expect(blueToken.hashRate).to.be.equal(4);
    expect(blueToken.price).to.be.equal(ethers.utils.parseEther("0.2"));
    expect(blueToken.terraHashedSold).to.be.equal(0);


    expect(await bitStackerNFT.totalSupply(0)).to.be.equal(0);
    expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
    expect(await bitStackerNFT.totalSupply(2)).to.be.equal(0);
    expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);

    expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
    expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);

    expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(80_000);
    expect(await bitStackerNFT.THForPresale()).to.be.equal(40_000);
    expect(await bitStackerNFT.THForPublicsale()).to.be.equal(40_000);

  });

  describe("Minting funcitons", async function () {

    it("nobody can mint before presale starts", async function () {
      await expect(bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") }))
        .to.be.revertedWith("SALE_IS_NOT_LIVE");
    })

    it("Only onwer can start presale", async function () {
      await expect(bitStackerNFT.connect(user1).setSaleType(1)).to.be.reverted;
      await bitStackerNFT.setSaleType(1)
    })

  })

  describe("Once presale starts, ", async function () {

    it("No one can mint with less funds", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1.9") }))
        .to.be.revertedWith("INSUFFICIENT_FUNDS");
      await expect(bitStackerNFT.connect(user1).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.19") }))
        .to.be.revertedWith("INSUFFICIENT_FUNDS");

    })

    it("No one can nonVIP tokens", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(bitStackerNFT.connect(user1).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1") }))
        .to.be.revertedWith("MINT_ONLY_VIP_TOKENS");
      await expect(bitStackerNFT.connect(user1).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") }))
        .to.be.revertedWith("MINT_ONLY_VIP_TOKENS");

    })

    it("users can mint one VIP token of each type (VIPBlack and VIPBlue)", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("2"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(40);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(1);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(1);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("2"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("0.2"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(40);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(4);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(1);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(1);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40 + 4);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(1);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(1);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("2.2"));
    })

    it("users can mint 10 VIP tokens of each type (VIPBlack and VIPBlue)", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(0, 10, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("20") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("20"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(400);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(10);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(400);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(10);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("20"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(1, 10, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2 * 10)) })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("2"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(400);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(40);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(10);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(10);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(400 + 40);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(10);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(10);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("22"));

    })

    it("users can mint 100 VIP tokens of each type (VIPBlack and VIPBlue)", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(0, 100, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("200") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("200"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(4000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(100);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(4000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(100);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("200"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(1, 100, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2 * 100)) })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("20"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(4000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(400);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(100);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(100);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(4000 + 400);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(100);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(100);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("220"));

    })

    it("users can mint all tokens as VIP tokens and no one will be able to mint anymore in presale (limited to 40_000 TH)", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(0, 500, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(500);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(20000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("1000"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(1, 5000, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String("1000")) })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20000);
      expect(await bitStackerNFT.balanceOf(user1.address, 0)).to.be.equal(500);
      expect(await bitStackerNFT.balanceOf(user1.address, 1)).to.be.equal(5000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(20000 + 20000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("2000"));

      await expect(bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      await expect(bitStackerNFT.connect(user1).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");

    })


  })

  describe("Once public sale start, ", async function () {

    it("No one can mint with less funds", async function () {
      await bitStackerNFT.setSaleType(2)

      await expect(bitStackerNFT.connect(user1).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.9") }))
        .to.be.revertedWith("INSUFFICIENT_FUNDS");
      await expect(bitStackerNFT.connect(user1).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.19") }))
        .to.be.revertedWith("INSUFFICIENT_FUNDS");

    })

    it("No one can VIP tokens", async function () {
      await bitStackerNFT.setSaleType(2)

      await expect(bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") }))
        .to.be.revertedWith("MINT_ONLY_NORMAL_TOKENS");
      await expect(bitStackerNFT.connect(user1).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") }))
        .to.be.revertedWith("MINT_ONLY_NORMAL_TOKENS");

    })

    it("users can mint one token of each type (VIPBlack and VIPBlue)", async function () {
      await bitStackerNFT.setSaleType(2)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(1);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(20);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("1"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("0.2"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(4);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(1);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(1);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(20 + 4);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(1);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("1.2"));
    })

    it("users can mint 10 VIP tokens of each type (VIPBlack and VIPBlue)", async function () {
      await bitStackerNFT.setSaleType(2)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(2, 10, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("10") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("10"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(200);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(10);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(200);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(10);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("10"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(3, 10, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("2"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(200);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(40);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(10);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(10);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(200 + 40);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(10);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(10);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("12"));
    })

    it("users can mint 100 VIP tokens of each type (VIPBlack and VIPBlue)", async function () {
      await bitStackerNFT.setSaleType(2)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(2, 100, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("100") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("100"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(2000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(100);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(2000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(100);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("100"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(3, 100, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("20") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("20"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(2000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(400);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(100);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(100);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(2000 + 400);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(100);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(100);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("120"));

    })

    it("users can mint all tokens as VIP tokens and no one will be able to mint anymore in public sale (limited to 40_000 TH)", async function () {
      await bitStackerNFT.setSaleType(2)

      await expect(() =>
        bitStackerNFT.connect(user1).mint(2, 1000, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(1000);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(20_000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("1000"));

      await expect(() =>
        bitStackerNFT.connect(user1).mint(3, 5000, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);
      expect(await bitStackerNFT.balanceOf(user1.address, 2)).to.be.equal(1000);
      expect(await bitStackerNFT.balanceOf(user1.address, 3)).to.be.equal(5000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("2000"));

      await expect(bitStackerNFT.connect(user1).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(1)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      await expect(bitStackerNFT.connect(user1).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");

    })


  })

  describe("General case, presale + public sale together", async function () {

    it("A user can mint whole presale and public sale (Presale = 40_000 TH, Public sale = 40_000 TH )", async function () {
      await bitStackerNFT.setSaleType(1)

      await expect(() =>
        bitStackerNFT.connect(user2).mint(0, 500, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user2.address, 0)).to.be.equal(500);
      expect(await bitStackerNFT.balanceOf(user2.address, 1)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(20_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("1000"));

      await expect(() =>
        bitStackerNFT.connect(user2).mint(1, 5000, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000);
      expect(await bitStackerNFT.balanceOf(user2.address, 0)).to.be.equal(500);
      expect(await bitStackerNFT.balanceOf(user2.address, 1)).to.be.equal(5000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(0);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("2000"));

      await expect(bitStackerNFT.connect(user2).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      await expect(bitStackerNFT.connect(user2).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");


      await bitStackerNFT.setSaleType(2)

      await expect(() =>
        bitStackerNFT.connect(user2).mint(2, 1000, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(0);
      expect(await bitStackerNFT.balanceOf(user2.address, 2)).to.be.equal(1000);
      expect(await bitStackerNFT.balanceOf(user2.address, 3)).to.be.equal(0);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(20_000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(0);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(1000 + 2000)));

      await expect(() =>
        bitStackerNFT.connect(user2).mint(3, 5000, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1000") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1000"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);
      expect(await bitStackerNFT.balanceOf(user2.address, 2)).to.be.equal(1000);
      expect(await bitStackerNFT.balanceOf(user2.address, 3)).to.be.equal(5000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(2000 + 2000)));

      await expect(bitStackerNFT.connect(user2).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(1)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      await expect(bitStackerNFT.connect(user2).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");

      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);

      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);


    })

  });

  describe("Project extension multiply times", async function () {

    it("Only owner can extend the TH of the project", async () => {
      await mintFirstBatch(user5);

      expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(80_000);
      expect(await bitStackerNFT.THForPresale()).to.be.equal(40_000);
      expect(await bitStackerNFT.THForPublicsale()).to.be.equal(40_000);

      await expect(bitStackerNFT.connect(user1).extendTerraHashes(50_000, 100_000))
        .to.be.revertedWith("Ownable: caller is not the owner");

      await bitStackerNFT.extendTerraHashes(50_000, 100_000)

      expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(150_000);
      expect(await bitStackerNFT.THForPresale()).to.be.equal(50_000);
      expect(await bitStackerNFT.THForPublicsale()).to.be.equal(100_000);

    })

    it("Users can resume minting presale and public sale after extention", async () => {
      await mintFirstBatch(user3);

      expect(await bitStackerNFT.balanceOf(user3.address, 0)).to.be.equal(500);
      expect(await bitStackerNFT.balanceOf(user3.address, 1)).to.be.equal(5000);
      expect(await bitStackerNFT.balanceOf(user3.address, 2)).to.be.equal(1000);
      expect(await bitStackerNFT.balanceOf(user3.address, 3)).to.be.equal(5000);


      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);

      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);

      expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(80_000);
      expect(await bitStackerNFT.THForPresale()).to.be.equal(40_000);
      expect(await bitStackerNFT.THForPublicsale()).to.be.equal(40_000);

      await expect(bitStackerNFT.connect(user1).extendTerraHashes(100_000, 100_000))
        .to.be.revertedWith("Ownable: caller is not the owner");

      await bitStackerNFT.extendTerraHashes(100_000, 100_000)

      expect(await bitStackerNFT.THForPresale()).to.be.equal(100_000);
      expect(await bitStackerNFT.THForPublicsale()).to.be.equal(100_000);
      expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(200_000);

      // 60_000 TH additional for Presale and 60_000 TH additional for Public sale

      await bitStackerNFT.setSaleType(1)

      await expect(() =>
        bitStackerNFT.connect(user4).mint(0, 750, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1500") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1500"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000 + 30_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000);
      // expect(await bitStackerNFT.balanceOf(user2.address, 0)).to.be.equal(1500 + 375);
      // expect(await bitStackerNFT.balanceOf(user2.address, 1)).to.be.equal(15000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000 + 30_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500 + 750);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(4000 + 1500)));

      await expect(() =>
        bitStackerNFT.connect(user4).mint(1, 7500, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1500") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1500"))
      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(20_000 + 30_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(20_000 + 30_000);
      // expect(await bitStackerNFT.balanceOf(user2.address, 0)).to.be.equal(1500 + 375);
      // expect(await bitStackerNFT.balanceOf(user2.address, 1)).to.be.equal(15000 + 3750);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(40_000 + 60_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000);
      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(500 + 750);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(5000 + 7500);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(4000 + 3000)));

      await expect(bitStackerNFT.connect(user4).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      await expect(bitStackerNFT.connect(user4).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");


      await bitStackerNFT.setSaleType(2)

      // 30_000 th
      await expect(() =>
        bitStackerNFT.connect(user4).mint(2, 1500, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1500") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1500"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000 + 30_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(100_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000 + 30_000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000 + 1500);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(4000 + 3000 + 1500)));


      // 30_000 th
      await expect(() =>
        bitStackerNFT.connect(user4).mint(3, 7500, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1500") })
      ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1500"))
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(20_000 + 30_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(20_000 + 30_000);
      expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(100_000);
      expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(40_000 + 60_000);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(1000 + 1500);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(5000 + 7500);
      expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(4000 + 3000 + 3000)));

      await expect(bitStackerNFT.connect(user4).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(1)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      await expect(bitStackerNFT.connect(user4).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
        .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");


      expect(await bitStackerNFT.totalSupply(0)).to.be.equal(1250);
      expect(await bitStackerNFT.totalSupply(1)).to.be.equal(12500);
      expect(await bitStackerNFT.totalSupply(2)).to.be.equal(2500);
      expect(await bitStackerNFT.totalSupply(3)).to.be.equal(12500);

      expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(50_000);
      expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(50_000);
      expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(50_000);
      expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(50_000);


      // // Extenion # 2

      // expect(await bitStackerNFT.THForPresale()).to.be.equal(150_000);
      // expect(await bitStackerNFT.THForPublicsale()).to.be.equal(100_000);
      // expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(250_000);

      // await expect(bitStackerNFT.connect(user1).extendTerraHashes(200_000, 150_000))
      //   .to.be.revertedWith("Ownable: caller is not the owner");
      // await bitStackerNFT.extendTerraHashes(200_000, 150_000)

      // expect(await bitStackerNFT.THForPresale()).to.be.equal(200_000);
      // expect(await bitStackerNFT.THForPublicsale()).to.be.equal(150_000);
      // expect(await bitStackerNFT.totalTerraHashes()).to.be.equal(350_000);


      // // 50_000 TH for presale + 50_000 Th for public sale
      // await bitStackerNFT.setSaleType(1)

      // // 25_000 TH 
      // await expect(() =>
      //   bitStackerNFT.connect(user6).mint(0, 625, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1250") })
      // ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1250"))
      // expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(75_000 + 25_000);
      // expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(75_000);
      // expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(150_000 + 25_000);
      // expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(100_000);
      // expect(await bitStackerNFT.totalSupply(0)).to.be.equal(1875 + 625);
      // expect(await bitStackerNFT.totalSupply(1)).to.be.equal(18750);
      // expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(2000 + 6000 + 1500 + 3000 + 1250)));

      // // 25_000 TH 
      // await expect(() =>
      //   bitStackerNFT.connect(user6).mint(1, 6250, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(1250)) })
      // ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther(String(1250)))
      // expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(75_000 + 25_000);
      // expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(75_000 + 25_000);
      // expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(150_000 + 50_000);
      // expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(100_000);
      // expect(await bitStackerNFT.totalSupply(0)).to.be.equal(1875 + 625);
      // expect(await bitStackerNFT.totalSupply(1)).to.be.equal(18750 + 6250);
      // expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(2000 + 6000 + 1500 + 3000 + 2500)));

      // await expect(bitStackerNFT.connect(user6).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(2)) }))
      //   .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      // await expect(bitStackerNFT.connect(user6).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
      //   .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");

      // await bitStackerNFT.setSaleType(2)


      // // 25_000 TH 
      // await expect(() =>
      //   bitStackerNFT.connect(user4).mint(2, 1250, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1250") })
      // ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1250"))
      // expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(50_000 + 25_000);
      // expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(50_000);
      // expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(200_000);
      // expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(100_000 + 25_000);
      // expect(await bitStackerNFT.totalSupply(2)).to.be.equal(2500 + 1250);
      // expect(await bitStackerNFT.totalSupply(3)).to.be.equal(12500);
      // expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(2000 + 6000 + 1500 + 3000 + 2500 + 1250)));


      // // 25_000 TH 
      // await expect(() =>
      //   bitStackerNFT.connect(user6).mint(3, 6250, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("1250") })
      // ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1250"))
      // expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(50_000 + 25_000);
      // expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(50_000 + 25_000);
      // expect(await bitStackerNFT.totalPresaleTerraHashesSold()).to.be.equal(200_000);
      // expect(await bitStackerNFT.totalPublicsaleterraHashesSold()).to.be.equal(100_000 + 50_000);
      // expect(await bitStackerNFT.totalSupply(2)).to.be.equal(2500 + 1250);
      // expect(await bitStackerNFT.totalSupply(3)).to.be.equal(12500 + 6250);
      // expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(2000 + 6000 + 1500 + 3000 + 2500 + 2500)));

      // await expect(bitStackerNFT.connect(user6).mint(2, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(1)) }))
      //   .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");
      // await expect(bitStackerNFT.connect(user6).mint(3, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther(String(0.2)) }))
      //   .to.be.revertedWith("NOT_ENOUGH_HASHRATE_AVAILABLE()");

      // expect(await bitStackerNFT.totalSupply(0)).to.be.equal(2500);
      // expect(await bitStackerNFT.totalSupply(1)).to.be.equal(25000);
      // expect(await bitStackerNFT.totalSupply(2)).to.be.equal(3750);
      // expect(await bitStackerNFT.totalSupply(3)).to.be.equal(18750);

      // expect((await bitStackerNFT.vipBlack()).terraHashedSold).to.be.equal(100_000);
      // expect((await bitStackerNFT.vipBlue()).terraHashedSold).to.be.equal(100_000);
      // expect((await bitStackerNFT.black()).terraHashedSold).to.be.equal(75_000);
      // expect((await bitStackerNFT.blue()).terraHashedSold).to.be.equal(75_000);
      // expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther(String(2000 + 6000 + 1500 + 3000 + 2500 + 2500)));

    })

  })

  it("Only Owner can withdraw the funds", async () => {
    await mintFirstBatch(user7);
    expect(await provider.getBalance(bitStackerNFT.address)).to.be.equal(ethers.utils.parseEther("4000"));

    await expect(bitStackerNFT.connect(user4).withdrawFunds()).to.be.reverted;

    await expect(() =>
      bitStackerNFT.withdrawFunds()
    ).to.changeEtherBalances(
      [deployer, bitStackerNFT],
      [ethers.utils.parseEther("4000"), ethers.utils.parseEther("4000").mul(-1) ]
    )

  })

  it("balancesOf functions works as expectation", async () => {
    await bitStackerNFT.setSaleType(1)
  
    await expect(() =>
      bitStackerNFT.connect(user1).mint(0, 1, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("2") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("2"))

    expect((await bitStackerNFT.balancesOf(user1.address))._vipBlack).to.be.equal(1);
    expect((await bitStackerNFT.balancesOf(user1.address))._vipBlue).to.be.equal(0);
    expect((await bitStackerNFT.balancesOf(user1.address))._black).to.be.equal(0);
    expect((await bitStackerNFT.balancesOf(user1.address))._blue).to.be.equal(0);

    await expect(() =>
      bitStackerNFT.connect(user1).mint(1, 1, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("0.2") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("0.2"))

    expect((await bitStackerNFT.balancesOf(user1.address))._vipBlack).to.be.equal(1);
    expect((await bitStackerNFT.balancesOf(user1.address))._vipBlue).to.be.equal(1);
    expect((await bitStackerNFT.balancesOf(user1.address))._black).to.be.equal(0);
    expect((await bitStackerNFT.balancesOf(user1.address))._blue).to.be.equal(0);

    // await expect(bitStackerNFT.setSaleType(true, true)).to.be.revertedWith("BOTH_CANT_BE_TRUE");
    await bitStackerNFT.setSaleType(2)

    await expect(() =>
      bitStackerNFT.connect(user1).mint(2, 5, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("5") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("5"))
    await expect(() =>
      bitStackerNFT.connect(user1).mint(3, 5, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("1") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1"))

    expect((await bitStackerNFT.balancesOf(user1.address))._vipBlack).to.be.equal(1);
    expect((await bitStackerNFT.balancesOf(user1.address))._vipBlue).to.be.equal(1);
    expect((await bitStackerNFT.balancesOf(user1.address))._black).to.be.equal(5);
    expect((await bitStackerNFT.balancesOf(user1.address))._blue).to.be.equal(5);

  })

  it("hashesOf functions works as expectation", async () => {
    await bitStackerNFT.setSaleType(1)
  
    await expect(() =>
      bitStackerNFT.connect(user1).mint(0, 2, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("4") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("4"))

    expect((await bitStackerNFT.hashesOf(user1.address))._vipBlackHash).to.be.equal(80);
    expect((await bitStackerNFT.hashesOf(user1.address))._vipBlueHash).to.be.equal(0);

    await expect(() =>
      bitStackerNFT.connect(user1).mint(1, 3, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("0.6") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("0.6"))

    expect((await bitStackerNFT.hashesOf(user1.address))._vipBlackHash).to.be.equal(80);
    expect((await bitStackerNFT.hashesOf(user1.address))._vipBlueHash).to.be.equal(12);

    // await expect(bitStackerNFT.setSaleType(true, true)).to.be.revertedWith("BOTH_CANT_BE_TRUE");
    await bitStackerNFT.setSaleType(2)

    await expect(() =>
      bitStackerNFT.connect(user1).mint(2, 5, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("5") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("5"))

    await expect(() =>
      bitStackerNFT.connect(user1).mint(3, 5, {bitCoinAddress: "", emailAddress: ""}, { value: ethers.utils.parseEther("1") })
    ).to.changeEtherBalance(bitStackerNFT, ethers.utils.parseEther("1"))

    expect((await bitStackerNFT.hashesOf(user1.address))._blackHash).to.be.equal(100);
    expect((await bitStackerNFT.hashesOf(user1.address))._blueHash).to.be.equal(20);

  })

  describe("Whitelisting works fine", function () {

    it("Only owner can whitelist users", async () => {

      const users = [ user1.address, user2.address, user3.address, user4.address ]
      const usersX = [user5.address, user6.address];

      await expect( bitStackerNFT.connect(user1).whiteListUsers(users) )
      .to.be.revertedWith("Ownable: caller is not the owner");

      await bitStackerNFT.whiteListUsers(users);

      users.map( async (user) => {
        expect( await bitStackerNFT.isWhiteListed(user) ).to.be.equal(true);
      })

      usersX.map( async (user) => {
        expect( await bitStackerNFT.isWhiteListed(user) ).to.be.equal(false);
      })

    })

    it("Only owner can change the status of the whitelist", async () => {
      expect( await bitStackerNFT.onlyWhiteListed()).to.be.equal(false);
      
      await expect( bitStackerNFT.connect(user1).changeWhiteListStatus(true)).to.be
      .to.be.revertedWith("Ownable: caller is not the owner");
      
      await bitStackerNFT.changeWhiteListStatus(true);

      expect( await bitStackerNFT.onlyWhiteListed()).to.be.equal(true);
           
    })


    it("If whitelist is active, only whitelisted users can mint", async () => {

      const users = [ user1.address, user2.address, user3.address, user4.address ]
      const usersX = [user5.address, user6.address];
      await bitStackerNFT.setSaleType(1); // presale
      
      await bitStackerNFT.changeWhiteListStatus(true);
     
      await expect(bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") }))
        .to.be.revertedWith("ONLY_WHITELISTED_ALLOWED");
      await expect(bitStackerNFT.connect(user1).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") }))
        .to.be.revertedWith("ONLY_WHITELISTED_ALLOWED");

      await bitStackerNFT.whiteListUsers(users);

      await bitStackerNFT.connect(user1).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") })
      await bitStackerNFT.connect(user2).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") })

      await expect(bitStackerNFT.connect(user5).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") }))
      .to.be.revertedWith("ONLY_WHITELISTED_ALLOWED");
      await expect(bitStackerNFT.connect(user6).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") }))
      .to.be.revertedWith("ONLY_WHITELISTED_ALLOWED");

      await bitStackerNFT.changeWhiteListStatus(false);

      await bitStackerNFT.connect(user5).mint(0, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("2") })
      await bitStackerNFT.connect(user6).mint(1, 1, { bitCoinAddress: "", emailAddress: "" }, { value: ethers.utils.parseEther("0.2") })


    })

  })

});
