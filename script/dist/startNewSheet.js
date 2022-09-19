"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
const holders_1 = require("./holders");
// const addresses = require("../../frontend/utils/contractAddresses.json");
// const abis = require("../../frontend/utils/abis.json");
var workbook = new exceljs_1.Workbook();
const filePath = "./bitstacker.xlsx";
const sheetname = "Sep2022";
const worksheet = workbook.addWorksheet(sheetname);
worksheet.columns = [
    { header: 'addresses', key: 'addresses', width: 50 },
    { header: '1', key: '1', width: 20 },
    { header: '2', key: '2', width: 20 },
    { header: '3', key: '3', width: 20 },
    { header: '4', key: '4', width: 20 },
    { header: '5', key: '5', width: 20 },
    { header: '6', key: '6', width: 20 },
    { header: '7', key: '7', width: 20 },
    { header: '8', key: '8', width: 20 },
    { header: '9', key: '9', width: 20 },
    { header: '10', key: '10', width: 20 },
    { header: '11', key: '11', width: 20 },
    { header: '12', key: '12', width: 20 },
    { header: '13', key: '13', width: 20 },
    { header: '14', key: '14', width: 20 },
    { header: '15', key: '15', width: 20 },
    { header: '16', key: '16', width: 20 },
    { header: '17', key: '17', width: 20 },
    { header: '18', key: '18', width: 20 },
    { header: '19', key: '19', width: 20 },
    { header: '20', key: '20', width: 20 },
    { header: '21', key: '21', width: 20 },
    { header: '22', key: '22', width: 20 },
    { header: '23', key: '23', width: 20 },
    { header: '24', key: '24', width: 20 },
    { header: '25', key: '25', width: 20 },
    { header: '26', key: '26', width: 20 },
    { header: '27', key: '27', width: 20 },
    { header: '28', key: '28', width: 20 },
    { header: '29', key: '29', width: 20 },
    { header: '30', key: '30', width: 20 },
    { header: '31', key: '31', width: 20 },
    { header: 'totalRewardLastMonth', key: 'totalRewardLastMonth', width: 30 },
    { header: 'totalReward', key: 'totalReward', width: 30 },
    { header: 'redeemedReward', key: 'redeemedReward', width: 30 },
];
worksheet.addRow([]);
worksheet.addRow(["dailyTotalBTCReward"]);
worksheet.addRow(["dailyHashCount"]);
worksheet.addRow([]);
holders_1.holders.map((holder) => {
    worksheet.addRow([holder]);
});
workbook.xlsx.writeFile(filePath)
    .then(() => console.log(`Sheet ${sheetname} created in file ${filePath}   `))
    .catch(err => console.log(err.message));
