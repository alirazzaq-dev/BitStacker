// import type { NextPage } from "next";
import React, { useEffect } from "react";

import Image from "next/image";
import { useState } from "react";
import { Navbar, Sidebar, SmallFooter } from "../components";
import { ArrowLeft } from "../assets/icons";
import { GetStaticProps } from "next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract, ethers } from "ethers";

import { BitStackerNFT } from "../types";
import contractAddresses from "../utils/contractAddresses.json";
import abis from "../utils/abis.json";
import { excludeDecimals } from "../utils/helpers";
import { InjectedConnector } from "@web3-react/injected-connector";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      data: "SSG",
    },
  };
};

interface Token {
  hashRate: BigNumber
  id: number
  price: BigNumber 
  terraHashedSold: BigNumber
}

interface Tokens {
  vipBlack :Token
  vipBlue: Token
  black: Token
  blue: Token
}

enum SaleTpe {
  CLOSED,
  PRIVATE,
  PUBLIC
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337],
});

const Minting = () => {

  const { active, activate, library: provider } = useWeb3React<ethers.providers.JsonRpcProvider>();
  const [hashAvailabe, setHashAvailable] = useState<string>("160,000");
  const [saleType, setSaleType] = useState<SaleTpe>(SaleTpe.CLOSED);
  const [tokens, setTokens] = useState<Tokens>();  
  const [selectedToken, setSelectedToken] = useState<number>(1);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<{0: number, 1: number, 2: number, 3: number, 4: number }>();
  const [addresses, setAddresses] = useState({bitcoin: "", email: ""})
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  // const [selectedText, setSelectedText] = useState("Black");
  
  const fetchContractDetails = async () => {
    if (provider) {
      try {
        const contract = new Contract(contractAddresses.BitStackerNFT, abis.BitStackerNFT, provider) as BitStackerNFT;
        const _available = contract.terrahashesAvailabe();
        const _saleType = contract.saleType()
        const _vipBlack = contract.vipBlack();
        const _vipBlue = contract.vipBlue();
        const _black = contract.black();
        const _blue = contract.blue();

        const [available, saleType, vipBlack, vipBlue, black, blue] =
          await Promise.all([_available, _saleType, _vipBlack, _vipBlue, _black, _blue])

        setSaleType(saleType)
        setTokens({ vipBlack, vipBlue, black, blue })
        setHashAvailable(available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        const _price = {
          [0]: Number(ethers.utils.formatEther(vipBlack.price)),
          [1]: Number(ethers.utils.formatEther(vipBlue.price)),
          [2]: Number(ethers.utils.formatEther(black.price)),
          [3]: Number(ethers.utils.formatEther(blue.price)),
          [4]: Number(ethers.utils.formatEther("0"))
        }
        setPrice(_price)
      }
      catch(e){
        console.error(e);
      }
    }
  }

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    }
    else {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }

  } 

  const handleAddresses = (val: string, type: "bitcoin"|"email") => {
    if(type === "bitcoin"){
      setAddresses((e) => ({...e, bitcoin: val}))
    }
    else{
      setAddresses((e) => ({...e, email: val}))
    }
  }

  const handleMint = async () => {
    if (provider) {
      try {
        const signer = provider.getSigner();
        const contract = new Contract(contractAddresses.BitStackerNFT, abis.BitStackerNFT, signer) as BitStackerNFT;
        if (addresses.bitcoin && addresses.email && price) {

        const value = (quantity * price[selectedToken as (0 | 1 | 2 | 3)]).toFixed(4)
        console.log("bitcoin: ", addresses.bitcoin)
        console.log("email: ", addresses.email)
        console.log("value: ", value)
        console.log("selectedToken: ", selectedToken)
        console.log("quantity: ", quantity)
          const tx = await contract.mint(selectedToken, quantity, addresses.bitcoin, addresses.email, { value: ethers.utils.parseEther(value) });
          await tx.wait(1);
          fetchContractDetails();
        }
        else {
          alert("Please fill in your BitCoin and Email address before minting");
        }
      } catch (e) {
        console.error(e);
      }
    }
    else {
      await activate(injected)
    }
  }



  useEffect(() => {
    fetchContractDetails();
  }, [provider])

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
                  {
                    (quantity * (price ? price[selectedToken as (0 | 1 | 2 | 3 | 4)] : selectedToken )).toFixed(2)
                  }

                </h1>
                <p className="mb-8 font-light text-4xl ml-2">ETH</p>
              </div>

              <div className="flex my-5 items-center">
                <div>
                  <Image
                    alt="arrow-left"
                    width={41}
                    height={20}
                    src={"/assets/icons/arrow-left.svg"}
                    onClick={() => handleQuantity("decrease")}
                  />
                </div>
                
                <h2 className="font-light text-3xl mx-5">{quantity}</h2>

                <div>
                  <Image
                    alt="arrow-right"
                    width={54}
                    height={20}
                    src={"/assets/icons/arrow-right.svg"}
                    onClick={() => handleQuantity("increase")}
                  />
                </div>
              </div>

              <p className="opacity-50 font-light text-2xl">
                Select quantity to mint
              </p>

              <div className="my-12 flex ">
                <h3 className="text-[#F3F3F3] font-normal text-2xl">
                  Select which tier to mint
                </h3>

                <select 
                  name="tokenType" 
                  id="tokenType" 
                  style={{marginLeft: "20px", width:"100px", background: "transparent"}} 
                  defaultValue={selectedToken}
                  onChange={(e)=> setSelectedToken(Number(e.target.value))}
                  >

                        <option value={0} style={{background: "black"}} >
                          VIP Black
                        </option>
                        
                        <option value={1} style={{background: "black"}} >
                          VIP Blue
                        </option>
                        
                        <option value={2} style={{background: "black"}}>
                          Black
                        </option>
                        
                        <option value={3} style={{background: "black"}}>
                          Blue
                        </option>                  
                        
                        <option value={4} style={{background: "black"}}>
                          Closed
                        </option>

                </select>

                {/* <div>
                  <div
                    onClick={() => { setIsDropDownOpen(!isDropDownOpen);}}
                    className={`${isDropDownOpen && ` bg-[#231F19] rounded-xl`} ml-1 cursor-pointer p-1 h-[72px]`} 
                    >

                    <div className="flex items-center">
                      <div
                        className={`${
                          isDropDownOpen
                            ? `${
                                selectedText === "Black"
                                  ? " bg-[#000000]"
                                  : " bg-[#02B2F2]"
                              } `
                            : "bg-transparent border border-[#00000033]"
                        } w-4 h-4 rounded-full flex items-center justify-center`}
                      >
                        <div className="bg-[#fff] w-1 h-1 rounded-full"></div>
                      </div>
                      <span className="font-bold text-2xl mx-3">
                        {selectedText}
                      </span>

                      <svg
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 1L5.5 10.5M5.5 10.5L10 4.5M5.5 10.5L1 4.5"
                          stroke="url(#paint0_linear_166_466)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_166_466"
                            x1="10"
                            y1="0.5"
                            x2="10"
                            y2="7.8136"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0" />
                            <stop offset="1" stopColor="white" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {
                    isDropDownOpen && (
                      <div
                        onClick={() => { setSelectedText( selectedText === "Black" ? "Blue" : "Black")}}
                        className="flex items-center"
                      >
                        <div
                          className={`${
                            isDropDownOpen
                              ? `${
                                  selectedText === "Black"
                                    ? " bg-[#02B2F2]"
                                    : " bg-[#000000]"
                                } `
                              : "bg-transparent border border-[#00000033]"
                          } w-4 h-4 rounded-full flex items-center justify-center`}
                        >
                          <div className="bg-[#fff] w-1 h-1 rounded-full"></div>
                        </div>
                        <span className="font-bold text-2xl mx-3">
                          {selectedText === "Black" ? "Blue" : "Black"}
                        </span>
                      </div>
                    )}
                  </div>
                </div> */}


              </div>

              <div style={{ margin: "10px", width: "250px", background: "balck"  }}>
                
                <input
                  type="text"
                  style={{ margin: "10px", width: "250px", color: "balck" }}
                  value={addresses.bitcoin}
                  defaultValue="Enter Your Bitcoin Address"
                  onChange={(e) => handleAddresses(e.target.value, "bitcoin")}
                />

                <input
                  type="text"
                  style={{ margin: "10px", width: "250px", color: "balck"  }}
                  value={addresses.email}
                  defaultValue="Enter Your Email Address"
                  onChange={(e) => handleAddresses(e.target.value, "email")}
                />

              </div>

              <button
                onClick={handleMint} 
                className="bg-transparent text-[#F7931B] border-2 border-[#F7931B] rounded-full py-5 px-32">
                Mint
              </button>

              <div className="flex items-center mt-11 justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12ZM10.185 7.6395C10.0729 7.55965 9.9409 7.51221 9.80358 7.50238C9.66627 7.49254 9.52889 7.52069 9.40651 7.58374C9.28413 7.64679 9.18147 7.74231 9.10976 7.85983C9.03806 7.97735 9.00008 8.11233 9 8.25V15.75C9.00008 15.8877 9.03806 16.0227 9.10976 16.1402C9.18147 16.2577 9.28413 16.3532 9.40651 16.4163C9.52889 16.4793 9.66627 16.5075 9.80358 16.4976C9.9409 16.4878 10.0729 16.4403 10.185 16.3605L15.435 12.6105C15.5322 12.5411 15.6115 12.4495 15.6661 12.3433C15.7208 12.2372 15.7494 12.1194 15.7494 12C15.7494 11.8806 15.7208 11.7628 15.6661 11.6567C15.6115 11.5505 15.5322 11.4589 15.435 11.3895L10.185 7.6395Z"
                    fill="#F5931B"
                  />
                </svg>

                <span className="font-normal text-lg ml-2">How it works?</span>
              </div>
            </div>

            <div>
              <div
                className="relative bg-right-bottom	 bg-no-repeat"
                style={{
                  backgroundImage: "url('/assets/pictures/pattern.png')",
                }}
              >
                <div className="bg-[#F7931B] absolute top-0 right-0  h-[300px] w-[300px] blur-[5000px]"></div>

                <img
                  alt="minting-banner"
                  src={"/assets/pictures/minting-banner.png"}
                />
              </div>
            </div>
          </div>
        </div>
        <SmallFooter />
      </div>
    </div>
  );
};

export default Minting;
