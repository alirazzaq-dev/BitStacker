import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import { Corss } from "../../assets/icons";
import { SMTPClient } from 'emailjs';
import axios from 'axios';
import { errorNotify, promiseNotify, successNotify } from '../../utils/toasts';


const WithdrawModel = (
    { setShowWithdrawModal, contactInfo, userAddress, availableBalance }:
        {
            setShowWithdrawModal: Dispatch<SetStateAction<boolean>>,
            availableBalance: string,
            userAddress: string,
            contactInfo: {
                bitCoinAddress: string;
                emailAddress: string;
            }
        }
) => {

    const [sending, setSending] = useState(false);

    const handleWithdraw = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try{
            setSending(true)
            const userData = {
                availableBalance,
                userAddress: userAddress,
                bitCoinAddress: contactInfo.bitCoinAddress,
                emailAddress: contactInfo.emailAddress
            }
            const tx = axios.post("/api/sendEmail", { userData: userData });
            // console.log("text: ", res.data.text);
            const res = await promiseNotify(
                tx,
                "Request initiated",
                "Successfully requested",
                "Error"
            );
           
            setSending(false);
            setShowWithdrawModal(false);
    
        }
        catch(e){
            console.error(e);
            setSending(false)
            errorNotify("Request Unsuccessful");
            setShowWithdrawModal(false);
        }

    }
    

    return (
        <div className="fixed top-0 left-0 bg-[#121212] bg-opacity-40 w-full h-full flex items-center justify-center ">
            <div className="bg-[#121212] max-w-[687px] mx-auto border w-full border-[#F7931B] border-opacity-40 rounded-3xl pt-5 pb-10 px-8 box-shadow">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-xl">
                        Withdraw <span className="text-[#F7931B]">Bitcoin</span>
                    </h1>

                    <div onClick={() => { setShowWithdrawModal(false);}}
                        className="bg-[#FF5B5B] cursor-pointer bg-opacity-5 rounded-full w-10 h-10 flex items-center justify-center">
                        <Corss />
                    </div>
                </div>

                <form className="flex flex-col items-center mt-5">
                    <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                        <input className="w-full bg-transparent outline-none font-medium text-lg" value={availableBalance + " BTC"}/>
                        <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                            <span className="opacity-50">Amount</span>
                        </p>
                    </div>

                    <div className="self-start w-full pl-4 space-y-1">
                        <div className="my-4">
                            <div className="flex ">
                                <h2 className="font-semibold text-xl">
                                    Bitcoin Address:{" "}
                                    <span className="opacity-70 font-normal text-base">
                                        {" "}
                                        {contactInfo.bitCoinAddress}
                                    </span>
                                </h2>
                            </div>
                            <div className="flex ">
                                <h2 className="font-semibold text-xl">
                                    Email Address:{" "}
                                    <span className="opacity-70 font-normal text-base">
                                        {" "}
                                        {contactInfo.emailAddress}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <p className="text-center w-full opacity-50 text-base italic my-2">
                            Make Sure your contact info is updated. If not, then please update it. Otherwise, your funds will be sent to this address
                        </p>
                    </div>
                    <button onClick={handleWithdraw} className="bg-[#F7931B] py-4 mt-8 font-bold text-2xl px-20 rounded-[50px]">
                        {sending ? "Submitting..." : "Submit" }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default WithdrawModel