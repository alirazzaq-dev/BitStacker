"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
var workbook = new exceljs_1.Workbook();
workbook.xlsx.readFile(filePath)
    .then(async () => {
    var worksheet = workbook.getWorksheet(sheetName);
    const addressColumn = worksheet.getColumn(1).values;
    const allAddress = addressColumn.slice(6, addressColumn.length);
    // dailyHashesCound
    const DHindex = addressColumn.findIndex((v) => v === "dailyHashCount");
    const DHRow = worksheet.getRow(DHindex);
    const DH = await getTotalHashesOfTheDay();
    console.log("DH: ", DH);
    DHRow.getCell(date + 1).value = DH;
    // All Dataes
    // const datesRow = worksheet.findRow(1).values as any[];
    // console.log("dates: ", datesRow)
    // console.log("allAddress: ", allAddress);
    // let allData: {[address: string]: string[]} = {}
    // console.log("Total Users: ", allAddress.length + "\n");
    for (let i = 0; i < allAddress.length; i++) {
        console.log("fetching data for user: ", i + 1);
        const address = String(allAddress[i]);
        const index = addressColumn.findIndex((v) => v === address);
        let userRow = worksheet.getRow(index);
        const hashes = await getHashes(address);
        userRow.getCell(date + 1).value = hashes;
        console.log("DONE!\n");
        // console.log("getCell: ", addressDetal.getCell(date+1).value ) 
        // let row = (JSON.parse(JSON.stringify(addressDetal.values)))
        // let finalRow = row.slice(1, row.length);
        // const data = [...finalRow, Number(hashes)];
        // console.log("data: ", data);
        // addressDetal.values =  data;
        // addressDetal.values = {
        //     id: date,
        // };
        // addressDetal.getCell("1").value = hashes;
        // console.log(addressDetal.values)
        // 
    }
    workbook.xlsx.writeFile(filePath)
        .then(() => console.log('file created'))
        .catch(err => console.log(err.message));
    // dailyBTCRewards        
    // const dailyBTCRewards = worksheet.getRows(3, 1);
    // const dailyBTCRewardsIndex = allAddress.findIndex((v) => v === "dailyTotalBTCReward");
    // const dailyBTCRewards = worksheet.getRows(dailyBTCRewardsIndex, 1);
    // dailyBTCRewards.forEach((r) => console.log(r.values) )
    // dailyHashesCound
    // const dailyHashesCount = worksheet.getRows(4, 1);
    // const dailyHashesCountIndex = allAddress.findIndex((v) => v === "dailyHashCount");
    // const dailyHashesCount = worksheet.getRows(dailyHashesCountIndex, 1);
    // dailyHashesCount.forEach((r) => console.log(r.values) )
    // Address Detail        
    // const index = allAddress.findIndex((v) => v === "address1");
    // const addressDetal = worksheet.getRows(index, 1);
    // addressDetal.forEach((r) => console.log(r.values))
    // console.log("columnCount: ", worksheet.columnCount)
    // console.log("rowCount: ", worksheet.rowCount)
    // worksheet.addRow(["account21", new Array(10)[0]])
    // console.log("columnCount: ", worksheet.columnCount)
    // console.log("rowCount: ", worksheet.rowCount)
});
