// import { BigNumber } from "ethers";


// export const today = () => {
//     return new Date().toISOString().slice(0, 19);
// };

// export const tommorow = () => {
//     return new Date(Date.now() + 24*3600*1000).toISOString().slice(0, 19);
// };

// export const getCurrentTime = () => {
//     return new Date().toISOString().slice(0, 10) + "\n\n\n" + new Date().toISOString().slice(11, 16);
// };

// export const getCompletionTime = (additional: number) => {
//     const newTime = Date.now() + additional;
//     // return new Date(currentTimeStamp + additional).toTimeString();
//     return new Date(newTime).toISOString().slice(0, 10) + "\n\n\n" + new Date(newTime).toISOString().slice(11, 16);

// };

// export const getTimeStamp = (time: string) => {
//     const currentDate = new Date(time);
//     return (currentDate.getTime() / 1000).toFixed();
// } 

// export const getDateNTime = (timestamp: number | string | BigNumber ) => {
//     const currentDate = new Date(Number(timestamp) * 1000);
//     return currentDate.toUTCString();
// } 

// export const includeDecimals = (amount: number | string | BigNumber, decimals: number) => {
//     return BigNumber.from(amount).mul(String(10**decimals));
// }

// export const excludeDecimals = (amount: number | string | BigNumber, decimals: number) => {
//     return (BigNumber.from(amount).div(String(10**decimals))).toString() ;
// }

// export const trimAddress = (address: string | undefined) => {
//     if (address) return address.slice(0,5) + "..." + (address.slice(38,42));
//     else return address;
// } 

import { Box, Flex, Spinner } from "@chakra-ui/react";


export const ValidateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
}

export const ValidateBitcoinAddress = (address: string) => {
    if (/([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/.test(address)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
}


// '([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}'


export const getLoader = (text: string) => {
    return <Flex alignItems="center" justifyContent = "center" border="1px solid red" h={50}>  <Spinner size="lg" /> </Flex>
}