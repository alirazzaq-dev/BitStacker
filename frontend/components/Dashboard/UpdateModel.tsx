import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { Corss } from "../../assets/icons";
import { BitStackerNFT } from '../../types';
import contractAddresses from "../../utils/contractAddresses.json";
import abis from "../../utils/abis.json";
import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { ValidateBitcoinAddress, ValidateEmail } from '../../utils/helpers';
import { promiseNotify, successNotify } from '../../utils/toasts';


const UpdateModel = (
    { setShowUpdateModal, setContactInfo, contactInfo }:
        {
            setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
            setContactInfo: Dispatch<SetStateAction<{ bitCoinAddress: string; emailAddress: string; }>>
            contactInfo: {
                bitCoinAddress: string;
                emailAddress: string;
            }
        }
) => {

    const { library: provider } = useWeb3React<ethers.providers.JsonRpcProvider>();
    const [updatedContactInfo, setUpdatedContactInfo] = useState({
        bitCoinAddress: contactInfo.bitCoinAddress,
        emailAddress: contactInfo.emailAddress,
    });

    const handleUpdatedContactInfo = (val: string, type: "bitcoin" | "email") => {
        if (type === "bitcoin") {
            setUpdatedContactInfo((e) => ({ ...e, bitCoinAddress: val }));
        } else {
            setUpdatedContactInfo((e) => ({ ...e, emailAddress: val }));
        }
    };

    const [updatingContactInfo, setUpdatingContactInfo] = useState(false);

    const submitUpdatedContactInfo = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setUpdatingContactInfo(true);
        const validEmail = ValidateEmail(updatedContactInfo.emailAddress);
        if (!validEmail) {
            alert("Invalid email address");
            setUpdatingContactInfo(false);
            throw ("INVALID EMAIL")
        }
        const validbitcoin = ValidateBitcoinAddress(updatedContactInfo.bitCoinAddress);
        if (!validbitcoin) {
            alert("Invalid bitcoin address");
            setUpdatingContactInfo(false);
            throw ("INVALID Bitcoin Address")
        }

        if (provider && validEmail && validbitcoin) {
            try {
                const signer = provider.getSigner();
                const contract = new Contract(
                    contractAddresses.BitStackerNFT,
                    abis.BitStackerNFT,
                    signer
                ) as BitStackerNFT;

                const tx = contract.resetContactInfo({
                    bitCoinAddress: updatedContactInfo.bitCoinAddress,
                    emailAddress: updatedContactInfo.emailAddress,
                });

                const txx = await promiseNotify(
                    tx,
                    "Transaction initiated",
                    "Successfully submitted. Please wait for the response",
                    "Error"
                );

                await txx.wait(1);
                successNotify("Contract info updated sucessfully");

                setContactInfo({
                    bitCoinAddress: updatedContactInfo.bitCoinAddress,
                    emailAddress: updatedContactInfo.emailAddress
                });
            }
            catch (e) {
                console.error(e);
            }

            setUpdatingContactInfo(false);
            setShowUpdateModal(false)
        }
    };

    return (
        <div className="fixed top-0 left-0 bg-[#121212] bg-opacity-40 w-full h-full flex items-center justify-center ">
            <div className="bg-[#121212] max-w-[687px] mx-auto border w-full border-[#F7931B] border-opacity-40 rounded-3xl pt-5 pb-10 px-8 box-shadow">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-xl">
                        Update <span className="text-[#F7931B]">Personal Info</span>
                    </h1>
                    <div onClick={() => { setShowUpdateModal(false) }}
                        className="bg-[#FF5B5B] cursor-pointer bg-opacity-5 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        <Corss />
                    </div>
                </div>

                <form className="flex flex-col items-center mt-5 space-y-5">
                    <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                        <input
                            value={updatedContactInfo.bitCoinAddress}
                            onChange={(e) =>
                                handleUpdatedContactInfo(e.target.value, "bitcoin")
                            }
                            className="w-full bg-transparent outline-none font-medium text-lg"
                        />
                        <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                            <span className="opacity-50">New Bitcoin Address</span>
                        </p>
                    </div>
                    <div className="w-full relative border border-[#595959] rounded-[50px] py-4 px-6 my-1">
                        <input
                            value={updatedContactInfo.emailAddress}
                            onChange={(e) =>
                                handleUpdatedContactInfo(e.target.value, "email")
                            }
                            className="w-full bg-transparent outline-none font-medium text-lg"
                        />
                        <p className="absolute -top-4 left-7  font-light text-base px-1 bg-[#121212]">
                            <span className="opacity-50">New Email Address</span>
                        </p>
                    </div>
                    <button
                        onClick={submitUpdatedContactInfo}
                        disabled={updatingContactInfo}
                        className="bg-[#F7931B] py-4 mt-8 font-bold text-2xl px-20 rounded-[50px]"
                    >
                        {
                            updatingContactInfo ? "Updating..." : "Update"
                        }

                    </button>
                </form>
            </div>
        </div>

    )
}

export default UpdateModel