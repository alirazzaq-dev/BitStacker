import type { NextApiRequest, NextApiResponse } from 'next'
import GSheetReader from 'g-sheets-api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

  console.log("req: ", req.body);
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
          console.log(results)
          return res.status(200).json(results)
        },
        (error: any) => {
            console.log("error: ", error);
        });
      




    // const doc = new GoogleSpreadsheet('1MarRDOEqIK9EtBqACrxICnCDC6IOCWJdxUYktoJU2pY');
    // await doc.useServiceAccountAuth(creds);
    // await doc.loadInfo(); // loads document properties and worksheets
    // const sheet = doc.sheetsByIndex[0]; // the first sheet
    // const rows = await sheet.getRows();
    // console.log("rows.length: ", rows.length); // 2
    // await sheet.loadCells('A1:G5');
    // const cellA1 = sheet.getCell(0, 0);
    // const cellC3 = sheet.getCellByA1('C3');
    // console.log("cellA1: ", cellA1)
    // console.log("cellC3: ", cellC3)
    

    // await sheet.loadCells()

    // const cellA1 = sheet.getCell(1, 0);
    // console.log("cellA1: ", cellA1.value)
    // // await sheet.loadCells({ startRowIndex: "0" }); // not all props required
    // cellA1.note = 'This is cell A1';
    // cellA1.value = "0xABC";
    // cellA1.textFormat = { bold: true };
    // // cellC3.formula = '=A1';
    // // console.log(cellC3.value); // this will throw an error
    // await sheet.saveUpdatedCells(); // saves both cells in one API call
    // console.log(cellA1.value); // 123.45

    
}