import {Workbook} from "exceljs";
var workbook = new Workbook();


const file = "./bitstacker.xlsx";

// const worksheet = workbook.addWorksheet("sep2020");
// worksheet.columns = [
//     { header: 'addresses', key: 'addresses', width: 50 },
//     { header: '1', key: '1', width: 20 },
//     { header: '2', key: '2', width: 20 },
//     { header: '3', key: '3', width: 20 },
//     { header: '4', key: '4', width: 20 },
//     { header: '5', key: '5', width: 20 },
//     { header: '6', key: '6', width: 20 },
//     { header: '7', key: '4', width: 20 },
//     { header: '8', key: '8', width: 20 },
//     { header: '9', key: '9', width: 20 },
//     { header: '10', key: '10', width: 20 },
//   ];

//   worksheet.addRow([])
//   worksheet.addRow([ "dailyTotalBTCReward", 5,6,8,4,7,8,9,3,1,5 ])
//   worksheet.addRow([ "dailyHashCount" ])
//   worksheet.addRow([])


//   worksheet.addRow(["address1", 1,2,3,4,5,5,4,3,2,1])
//   worksheet.addRow(["address2", 1,2,3,4,5,5,4,3,2,1])
//   worksheet.addRow(["address3", 1,5,2,3,4,5,4,3,2,1])
//   worksheet.addRow(["address4", 4,3,2,1,2,3,4,5,5,1])
//   worksheet.addRow(["address5", 3,4,5,1,2,5,4,3,2,1])
//   worksheet.addRow(["address6", 5,4,3,1,2,3,4,5,2,1])
//   worksheet.addRow(["address7", 5,4,3,2,1,2,3,4,5,1])
//   worksheet.addRow(["address8", 1,2,4,3,2,13,4,5,5,])
//   worksheet.addRow(["address9", 5,5,4,3,2,1,1,2,3,4])
//   worksheet.addRow(["address10", 4,5,5,4,3,2,1,1,2,3])
//   worksheet.addRow(["address11", 1,2,3,4,5,5,4,3,2,1])
//   worksheet.addRow(["address12", 1,2,3,4,5,5,4,3,2,1])
//   worksheet.addRow(["address13", 1,5,2,3,4,5,4,3,2,1])
//   worksheet.addRow(["address14", 4,3,2,1,2,3,4,5,5,1])
//   worksheet.addRow(["address15", 3,4,5,1,2,5,4,3,2,1])
//   worksheet.addRow(["address16", 5,4,3,1,2,3,4,5,2,1])
//   worksheet.addRow(["address17", 5,4,3,2,1,2,3,4,5,1])
//   worksheet.addRow(["address18", 1,2,4,3,2,13,4,5,5,])
//   worksheet.addRow(["address19", 5,5,4,3,2,1,1,2,3,4])
//   worksheet.addRow(["address20", 4,5,5,4,3,2,1,1,2,3])


const sheet = "sep2022"
workbook.xlsx.readFile(file)
    .then(function () {

        var worksheet = workbook.getWorksheet(sheet);

        // All Dataes
        const datesRow = worksheet.getRow(1).values as any[];
        console.log("dates: ", datesRow)
        
        const allAddress = worksheet.getColumn(1).values;
        console.log("allAddress: ", allAddress);

        // dailyBTCRewards        
        // const dailyBTCRewards = worksheet.getRows(3, 1);
        const dailyBTCRewardsIndex = allAddress.findIndex((v) => v === "dailyTotalBTCReward");
        const dailyBTCRewards = worksheet.getRows(dailyBTCRewardsIndex, 1);
        dailyBTCRewards.forEach((r) => console.log(r.values) )
        

        // dailyHashesCound
        // const dailyHashesCount = worksheet.getRows(4, 1);
        const dailyHashesCountIndex = allAddress.findIndex((v) => v === "dailyHashCount");
        const dailyHashesCount = worksheet.getRows(dailyHashesCountIndex, 1);
        dailyHashesCount.forEach((r) => console.log(r.values) )
        

        // Address Detail        
        const index = allAddress.findIndex((v) => v === "address1");
        const addressDetal = worksheet.getRows(index, 1);
        addressDetal.forEach((r) => console.log(r.values))


        console.log("columnCount: ", worksheet.columnCount)
        console.log("rowCount: ", worksheet.rowCount)

        // worksheet.addRow(["account21", new Array(10)[0]])

        // console.log("columnCount: ", worksheet.columnCount)
        // console.log("rowCount: ", worksheet.rowCount)


    });




// workbook.xlsx.writeFile(file)
//     .then(() => console.log('file created'))
//     .catch(err => console.log(err.message));