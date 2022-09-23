import React, { useEffect } from "react";

import Image from "next/image";
import { useState } from "react";
import { Navbar, Sidebar, SmallFooter } from "../components";
import { ArrowLeft, ArrowRight, Play } from "../public/assets/icons";
import { GetStaticProps } from "next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract, ethers } from "ethers";

import { BitStackerNFT } from "../types";
import contractAddresses from "../utils/contractAddresses.json";
import abis from "../utils/abis.json";
import { InjectedConnector } from "@web3-react/injected-connector";

import { ValidateBitcoinAddress, ValidateEmail } from "../utils/helpers";
import { promiseNotify, successNotify } from "../utils/toasts";
import { getLoader } from "../utils/helpers";


// import {image0, image1, image2, image3} from "../public/assets/images";

import image0 from "../public/assets/images/0.png";
import image1 from "../public/assets/images/1.png";
import image2 from "../public/assets/images/2.gif";
import image3 from "../public/assets/images/3.gif";

// const image0 = "../public/assets/images/0.png";
// const image1 = "../public/assets/images/1.png";
// const image2 = "../public/assets/images/2.gif";
// const image3 = "../public/assets/images/3.gif";

// const image0 = "/assets/images/0.png";
// const image1 = "/assets/images/1.png";
// const image2 = "/assets/images/2.gif";
// const image3 = "/assets/images/3.gif";


export const getStaticProps: GetStaticProps = async (context) => {
  console.log("Imagessss")
  return {
    props: {
      data: "SSG",
    },
  };
};

interface Token {
  hashRate: BigNumber;
  id: number;
  price: BigNumber;
  terraHashedSold: BigNumber;
}

interface Tokens {
  vipBlack: Token;
  vipBlue: Token;
  black: Token;
  blue: Token;
}

enum SaleType {
  CLOSED,
  PRIVATE,
  PUBLIC,
}

enum TokenType {
  VIPBLACK,
  VIPBLUE,
  BLACK,
  BLUE,
  CLOSED
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337],
});

const Minting = () => {
  const { account, active, activate, library: provider } = useWeb3React<ethers.providers.JsonRpcProvider>();
  const [hashAvailabe, setHashAvailable] = useState<string>("160,000");
  const [saleType, setSaleType] = useState<SaleType>(SaleType.PUBLIC);

  const [tokens, setTokens] = useState<Tokens>();
  const [selectedToken, setSelectedToken] = useState<TokenType>(TokenType.BLACK);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<{ 0: number; 1: number; 2: number; 3: number; 4: number; }>();
  const [addresses, setAddresses] = useState({ bitcoin: "", email: "" });
  const [isMinting, setIsMinting] = useState(false);
  const [balance, setBalance] = useState("0.0000");
  const mintingLoader = getLoader("Minting");
  const [image, setImage] = useState(image2)


  const fetchContractDetails = async () => {
    if (provider && account) {
      try {
        const contract = new Contract(contractAddresses.BitStackerNFT, abis.BitStackerNFT, provider) as BitStackerNFT;
        const _available = contract.terrahashesAvailabe();
        const _saleType = contract.saleType();
        const _vipBlack = contract.vipBlack();
        const _vipBlue = contract.vipBlue();
        const _black = contract.black();
        const _blue = contract.blue();
        const _contactInfo = contract.contactInfo(account);

        const [available, saleType, vipBlack, vipBlue, black, blue, contactInfo] =
          await Promise.all([_available, _saleType, _vipBlack, _vipBlue, _black, _blue, _contactInfo]);

        setAddresses({ bitcoin: contactInfo.bitCoinAddress, email: contactInfo.emailAddress });

        setSaleType(saleType);

        if (saleType === SaleType.CLOSED) {
          setSelectedToken(TokenType.CLOSED)
        }
        else if (saleType === SaleType.PRIVATE) {
          setSelectedToken(TokenType.VIPBLACK)
          setImage(image0)

        }
        else if (saleType === SaleType.PUBLIC) {
          setSelectedToken(TokenType.BLACK)
          setImage(image2)

        }

        setTokens({ vipBlack, vipBlue, black, blue });

        setHashAvailable(available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        const _price = {
          [0]: Number(ethers.utils.formatEther(vipBlack.price)),
          [1]: Number(ethers.utils.formatEther(vipBlue.price)),
          [2]: Number(ethers.utils.formatEther(black.price)),
          [3]: Number(ethers.utils.formatEther(blue.price)),
          [4]: Number(ethers.utils.formatEther("0")),
        };
        setPrice(_price);

        const balanceWei = await provider.getBalance(account);
        const balanceEths = ethers.utils.formatEther(balanceWei);
        setBalance(Number(balanceEths).toFixed(4));



      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleAddresses = (val: string, type: "bitcoin" | "email") => {
    if (type === "bitcoin") {
      setAddresses((e) => ({ ...e, bitcoin: val }));
    } else {
      setAddresses((e) => ({ ...e, email: val }));
    }
  };

  const handleMint = async () => {
    console.log("Minting...")
    setIsMinting(true);

    if (provider && account) {
      try {
        const signer = provider.getSigner();
        const contract = new Contract(
          contractAddresses.BitStackerNFT,
          abis.BitStackerNFT,
          signer
        ) as BitStackerNFT;

        const isWhiteListingActive = await contract.onlyWhiteListed();
        const isUserWhiteListed = await contract.isWhiteListed(account);
        
        if(isWhiteListingActive && !isUserWhiteListed){
          alert("You are not whitelisted.")
          throw("NOT_WHITELISTED");
        }

        const validbitcoin = ValidateBitcoinAddress(addresses.bitcoin);
        if (!validbitcoin) {
          alert("Invalid bitcoin address");
          throw ("INVALID Bitcoin Address")
        }
        const validEmail = ValidateEmail(addresses.email);
        if (!validEmail) {
          alert("Invalid email address");
          throw ("INVALID EMAIL")
        }
        
        if (price) {
          const value = (quantity * price[selectedToken as 0 | 1 | 2 | 3]).toFixed(4);

          // console.log("balance", balance);
          // console.log("value", value);
          if (Number(balance) <= Number(value)) {
            alert("Balance is insufficient");
            throw ("Balance is insufficient")
          }

          const tx = contract.mint( selectedToken, quantity,
            {
              bitCoinAddress: addresses.bitcoin,
              emailAddress: addresses.email,
            },
            { value: ethers.utils.parseEther(value) }
          );

          const txx = await promiseNotify(
            tx,
            "Transaction initiated",
            "Waitng for the response",
            "Error"
          )
          await txx.wait(1);

          successNotify("Minting Successful. Congratulations")

          fetchContractDetails();
          setIsMinting(false);

        } else {
          alert("Please fill in your BitCoin and Email address before minting");
          setIsMinting(false);

        }
      } catch (e: any) {
        console.error(e);
        setIsMinting(false);

      }
    } else {
      await activate(injected);
      setIsMinting(false);

    }


  };

  useEffect(() => {
    fetchContractDetails();
  }, [provider]);


  const handleType = async (type: SaleType) => {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new Contract(contractAddresses.BitStackerNFT, abis.BitStackerNFT, signer) as BitStackerNFT;
      const tx = await contract.setSaleType(type);
      await tx.wait(1);
    }
  }



  return (
    <div className="flex bg-[#070503] min-h-screen">
      <Sidebar />

      <div className="ml-48 main py-7 px-5 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="flex flex-col items-center mt-8 justify-center">
            <h1 className="font-bold text-[60px] leading-[80px] tracking-[0.14rem]">
              {hashAvailabe}
            </h1>
            <h3 className="font-light text-2xl leading-[28px]">
              Available TH/s
            </h3>
          </div>

          <div className="flex justify-between">
            <div>
              <div className="flex items-end">
                <h1
                  style={{ backgroundImage: "url('/assets/icons/curve.svg')" }}
                  className="font-bold text-[90px]  bg-no-repeat bg-right-bottom	"
                >
                  {(
                    quantity *
                    (price
                      ? price[selectedToken as 0 | 1 | 2 | 3 | 4]
                      : selectedToken)
                  ).toFixed(2)}
                </h1>
                <p className="mb-8 font-light text-4xl ml-2">ETH</p>
              </div>

              <div className="flex my-5 items-center">
                <div onClick={() => handleQuantity("decrease")}>
                  <ArrowLeft />
                </div>

                <h2 className="font-light text-3xl mx-5">{quantity}</h2>

                <div onClick={() => handleQuantity("increase")}>
                  <ArrowRight />
                </div>
              </div>

              <p className="opacity-50 font-light text-2xl">
                Select quantity to mint
              </p>

              <div className="my-12 flex ">
                <h3 className="text-[#F3F3F3] font-normal text-xl">
                  Select which tier to mint
                </h3>

                <select
                  name="tokenType"
                  id="tokenType"
                  className="ml-5 w-fit-content bg-transparent font-bold text-lg outline-none p-0"
                  defaultValue={selectedToken}
                  onChange={(e) => {
                    setSelectedToken(Number(e.target.value))
                    
                    switch (Number(e.target.value)){
                      case 0:
                        setImage(image0)
                        break
                      case 1:
                        setImage(image1)
                        break
                      case 2:
                        setImage(image2)
                        break
                      case 3:
                        setImage(image3)
                        break
                      case 4:
                        setImage(image0)
                        break
                    }

                  }}
                >
                  {
                    saleType === SaleType.PRIVATE && (
                      <>
                        <option
                          className="font-medium my-1 text-base"
                          value={TokenType.VIPBLACK}
                          style={{ background: "black" }}
                        >
                          Royal Black
                        </option>

                        <option
                          className="font-medium my-1 text-base"
                          value={TokenType.VIPBLUE}
                          style={{ background: "black" }}
                        >
                          Royal Blue
                        </option>

                      </>
                    )
                  }

                  {
                    saleType === SaleType.PUBLIC && (
                      <>
                        <option
                          className="font-medium my-1 text-base"
                          value={TokenType.BLACK}
                          style={{ background: "black" }}
                        >
                          Black
                        </option>

                        <option
                          className="font-medium my-1 text-base"
                          value={TokenType.BLUE}
                          style={{ background: "black" }}
                        >
                          Blue
                        </option>
                      </>
                    )
                  }

                  {
                    saleType === SaleType.CLOSED && (
                      <option
                        className="font-medium my-1 text-base"
                        value={TokenType.CLOSED}
                        style={{ background: "black" }}
                      >
                        Closed
                      </option>
                    )
                  }


                </select>

              </div>

              <div className="w-[400px]">
                <input
                  type="text"
                  className="border border-[#F7931B] my-1 outline-none text-base bg-transparent rounded-full py-2 px-3 w-full"
                  value={addresses.bitcoin}
                  placeholder="Enter Your Bitcoin Address"
                  onChange={(e) => handleAddresses(e.target.value, "bitcoin")}
                />
                <input
                  type="text"
                  className="border border-[#F7931B] my-1 outline-none text-base bg-transparent rounded-full py-2 px-3 w-full"
                  value={addresses.email}
                  placeholder="Enter Your Email Address"
                  onChange={(e) => handleAddresses(e.target.value, "email")}
                />

                <button
                  onClick={handleMint}
                  disabled={!active || selectedToken === TokenType.CLOSED || isMinting}
                  style={{padding: "10px"}}
                  className="bg-transparent text-[#F7931B] text-base mt-2 w-full border-2 border-[#F7931B] rounded-full py-5 px-32"
                >
                  {isMinting ? mintingLoader : "Mint"}
                </button>
              </div>

              <div className="flex items-center mt-11 justify-center">
                <Play />

                <span className="font-normal text-lg ml-2">How it works?</span>
              </div>
            </div>

            <div className="flex-1">
              <div
                className="relative bg-right-bottom	 bg-no-repeat"
                style={{
                  backgroundImage: "url('/assets/pictures/pattern.png')",
                }}
              >
                <div className="bg-[#F7931B] absolute top-0 right-0  h-[300px] w-[300px] blur-[5000px]"></div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10
                  }}>
                  <Image
                    width={800}
                    height={500}
                    alt="minting-banner"
                    src={ image }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SmallFooter />

        <div style={{ margin: 10}}>
        <div>For Testing</div>
        <div style={{ height: "10vh", border: "1px solid red", display: "flex", justifyContent: "space-around" }}>
          <button onClick={() => handleType(SaleType.CLOSED)}> Closed </button>
          <button onClick={() => handleType(SaleType.PRIVATE)}> Private </button>
          <button onClick={() => handleType(SaleType.PUBLIC)}> Public </button>
        </div>
        </div> 


      </div>
    </div>
  );
};

export default Minting;
