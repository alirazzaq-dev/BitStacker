import { BigNumber } from "ethers";


export const today = () => {
    return new Date().toISOString().slice(0, 19);
};

export const tommorow = () => {
    return new Date(Date.now() + 24*3600*1000).toISOString().slice(0, 19);
};

export const getCurrentTime = () => {
    return new Date().toISOString().slice(0, 10) + "\n\n\n" + new Date().toISOString().slice(11, 16);
};

export const getCompletionTime = (additional: number) => {
    const newTime = Date.now() + additional;
    // return new Date(currentTimeStamp + additional).toTimeString();
    return new Date(newTime).toISOString().slice(0, 10) + "\n\n\n" + new Date(newTime).toISOString().slice(11, 16);

};

export const getTimeStamp = (time: string) => {
    const currentDate = new Date(time);
    return (currentDate.getTime() / 1000).toFixed();
} 

export const getDateNTime = (timestamp: number | string | BigNumber ) => {
    const currentDate = new Date(Number(timestamp) * 1000);
    return currentDate.toUTCString();
} 

export const includeDecimals = (amount: number | string | BigNumber, decimals: number) => {
    return BigNumber.from(amount).mul(String(10**decimals));
}

export const excludeDecimals = (amount: number | string | BigNumber, decimals: number) => {
    return (BigNumber.from(amount).div(String(10**decimals))).toString() ;
}

export const trimAddress = (address: string | undefined) => {
    if (address) return address.slice(0,5) + "..." + (address.slice(38,42));
    else return address;
} 
