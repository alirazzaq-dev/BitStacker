import type { NextApiRequest, NextApiResponse } from 'next'
import GSheetReader from 'g-sheets-api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {


  const announcementFilter = {
    'announcements': "announcements"
  }
  const datesFilter = {
    'announcements': "dates"
  }

  const secrets = {
    apiKey: 'AIzaSyBEz8Xen5ehx1qVEE0PsgFvRtq0sJmlo6U',
    sheetId: "1SzYjRqW8HKZ19JOM6pN0ryGH0-tua2bpQCPortfkwZ4"
  }
    
    let announcements: any;
    let dates: any;

  await GSheetReader(
    { ...secrets, filter: announcementFilter },
    (results: any) => {
      let data = results[0];
      delete data["announcements"];
      announcements = data
  },
    (error: any) => {
      console.log("error: ", error);
    });

   await  GSheetReader(
      { ...secrets, filter: datesFilter },
      (results: any) => {
        let data = results[0];
        delete data["announcements"];
        dates = data
      },
      (error: any) => {
        console.log("error: ", error);
      });
      

      return res.status(200).json({announcements, dates})
   
}