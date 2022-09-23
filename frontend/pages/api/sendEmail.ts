import type { NextApiRequest, NextApiResponse } from 'next'
import GSheetReader from 'g-sheets-api';
import { SMTPClient } from 'emailjs';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    type IncomingData = {
        availableBalance: string;
        userAddress: string;
        bitCoinAddress: string;
        emailAddress: string;
    }
    
    const userData = req.body.userData as IncomingData;

    console.log("userData: ", userData);

    // bitstackerapp
    // bitstackeradmin
    const client = new SMTPClient({
        user: 'bitstackerapp',
        password: 'urkrvluuptmyusdj',
        host: 'smtp.gmail.com',
        ssl: true,
    });

    const messageX = `Dear User,\n\nYour withdraw request for ${userData.availableBalance} BTC reward has been submitted. 

    Wallet Address: ${userData.userAddress}
    Bitcoin Address: ${userData.bitCoinAddress}
    
    \nYour payment will be processed in 2-3 working days
    
    \nRegards, \n Team Bitstacker`;

    console.log("Processing")
    try {
        const message = await client.sendAsync({
            text: messageX,
            // text: "Hello world",
            from: 'bitstackerapp@gmail.com',
            // to: `${userData.availableBalance}, bitstackerapp@gmail.com`,
            to: userData.emailAddress,
            cc: 'alirazzaqdev@gmail.com',
            subject: `Request Withdraw for ${userData.userAddress}`,
            // subject: "SUBJECT"
            // to: 'alirazzaqdev@gmail.com',
        });
        console.log("message: ", message);
        return res.status(200).json(message)

    } catch (err) {
        console.error(err);
    }



}