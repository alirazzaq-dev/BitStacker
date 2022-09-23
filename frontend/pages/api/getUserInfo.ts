import type { NextApiRequest, NextApiResponse } from 'next'
import GSheetReader from 'g-sheets-api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const address = req.body.address;
    const options = {
        apiKey: 'AIzaSyBEz8Xen5ehx1qVEE0PsgFvRtq0sJmlo6U',
        sheetId: "1MarRDOEqIK9EtBqACrxICnCDC6IOCWJdxUYktoJU2pY",
        sheetName: 'August2022', // if sheetName is supplied, this will take precedence over sheetNumber
        filter: {
          'addresses': address,
        },
      }

      
    GSheetReader(
        options,
        (results: any) => {
          results[0].sheetName = 'August 2022';
          // console.log(results)
          return res.status(200).json(results)
        },
        (error: any) => {
            console.log("error: ", error);
        });
      
    
}