import { CellValue, Row, Workbook } from "exceljs";
import { ethers, Contract } from "ethers";
import { BitStackerNFT } from "./types/index";
import { holders } from "./holders";

const addresses = require("../../frontend/utils/contractAddresses.json");
const abis = require("../../frontend/utils/abis.json");


const fileName = "bitstacker.xlsx"
const sheetName = "Sep2022"
const date = 5

const filePath = `./${fileName}`;

var workbook = new Workbook();


workbook.xlsx.readFile(filePath)
    .then(async () => {
        console.clear();

        console.log("Welcome to the Bitstacker Admin App");
        console.log(`Updateing Sheet: ${sheetName} from File: ${fileName}`);
        console.log("For date: ", date + "\n")


        // Step 1: Update the holders list
        // updateHoldersList();

        var worksheet = workbook.getWorksheet(sheetName);
        var addressColumn = worksheet.getColumn(1).values;

        holders.map((holder) => {
            const userIndex = addressColumn.findIndex((v) => v === holder);
            if (userIndex < 0) {
                worksheet.addRow([holder])
            }
        })

        await workbook.xlsx.writeFile(filePath)
            .then(() => console.log('Users list is updated'))
            .catch(err => console.log(err.message));


        // Step 2: Fetch all the addresses from the sheet
        var worksheet = workbook.getWorksheet(sheetName);
        var addressColumn = worksheet.getColumn(1).values;


        // Step 3: Check if admin has add the daily BTC reward
        const DBTCRindex = addressColumn.findIndex((v) => v === "dailyTotalBTCReward");
        const DBTCRRow = worksheet.getRow(DBTCRindex);
        const DBTCR = Number(DBTCRRow.getCell(date + 1).value);
        if (DBTCR === 0) {
            throw (`Please add a Daily BTC Reward for date ${date} before proceeding with calculation`);
            
        }
        console.log("Daily BTC Reward: ", DBTCR)

        // Step 4: Update the dailyHashes Value for the day
        const DHindex = addressColumn.findIndex((v) => v === "dailyHashCount");
        const DHRow = worksheet.getRow(DHindex);
        const DH = await getTotalHashesOfTheDay();
        DHRow.getCell(date + 1).value = DH
        console.log("Daily Hashes updated: ", DH + "\n");

        // Step 5: Update data for each user
        const allAddress = addressColumn.slice(6, addressColumn.length);
        for (let i = 0; i < allAddress.length; i++) {
            console.log("fetching data for user: ", (i + 1) + "/" + allAddress.length);
            const address = String(allAddress[i])
            const index = addressColumn.findIndex((v) => v === address);
            let userRow = worksheet.getRow(index);
            const hashes = await getHashes(address)
            userRow.getCell(date + 1).value =  DBTCR*(hashes/DH)
            // hashes

            let userRowUpdated = worksheet.getRow(index);
            const userMonthlyHashes: number[] = JSON.parse(JSON.stringify(userRowUpdated.values)).slice(2, 33);
            // console.log( "userRow: ", userMonthlyHashes )

            // let DHRowUpadated = worksheet.getRow(DHindex);
            // const monthlyhashed: number[] = JSON.parse(JSON.stringify(DHRowUpadated.values)).slice(2, 33);
            // console.log( "monthlyhashed ", monthlyhashed )

            let DBTCRRowUpdated = worksheet.getRow(DBTCRindex);
            const monthlyRewardData: number[] = JSON.parse(JSON.stringify(DBTCRRowUpdated.values)).slice(2, 33);
            // console.log( "monthlyRewardData ", monthlyRewardData )




            let totalMonthlyReward = 0;
            let totalMonthlyRewardOfUser = 0;
            userMonthlyHashes.map((hash, index) => {
                totalMonthlyReward += Number(monthlyRewardData[index])
                totalMonthlyRewardOfUser += Number(userMonthlyHashes[index])
                // if(hash){
                    // totalMonthlyRewardOfUser += Number(monthlyRewardData[index])*(Number(userMonthlyHashes[index])/Number(monthlyhashed[index]))
                    
                    // console.log(totalMonthlyReward)
                // }
            });

            // console.log(totalMonthlyReward)

            // console.log("monthlyReward : ", monthlyRewardsOfUser);

            
            
            // console.log("usersTotalReward: ", usersTotalReward);
            // console.log("DH: ", DH);
            // console.log("UH :", hashes);
            



            // const usersTotalReward = Number(userRow.getCell(33).value);
            // const newReward = usersTotalReward + DBTCR*(hashes/DH)
            // console.log("userRowUpdated.getCell(34).value: ", userRowUpdated.getCell(34).value);
            
            DBTCRRowUpdated.getCell(34).value = totalMonthlyReward;
            userRowUpdated.getCell(34).value = totalMonthlyRewardOfUser;
            



            // console.log("Total Daily Reward :", DBTCR + "BTC");
            // console.log("Total Daily Hashes :", DH + "terraHash");

            // console.log("Users Old Reward :", usersTotalReward + "BTC");
            // console.log("Users Daily Hashes :", hashes + "terraHash");
            // console.log("User's daily share of hashes in %:", (hashes/DH * 100) + "%")
            // console.log("User today's BTC Reward :", DBTCR*(hashes/DH) + "BTC");

            // console.log("today's reward :", DBTCR*(hashes/DH) )
            // console.log("oldReward :", usersTotalReward)
            // console.log("newReward :", newReward)

            console.log(`\nReport`);
            console.log(`User: ${address}`);
            console.log(`Hashes: ${hashes}`);
            console.log(`Reward: ${DBTCR*(hashes/DH)} BTC out of ${DBTCR} BTC`);
            console.log(`Total reward: ${totalMonthlyReward} \n`)
        }


        // Step 6: Update the file 
        await workbook.xlsx.writeFile(filePath)
            .then(() => console.log('file created'))
            .catch(err => console.log(err.message));

        



        // All Dataes
        // const datesRow = worksheet.findRow(1).values as any[];
        // console.log("dates: ", datesRow)


        // console.log("allAddress: ", allAddress);
        // let allData: {[address: string]: string[]} = {}
        // console.log("Total Users: ", allAddress.length + "\n");

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


const getTotalHashesOfTheDay = async () => {

    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/d9fb7fe853c94891811d279e8055defe");
    const contract = new Contract(addresses.BitStackerNFT, abis.BitStackerNFT, provider) as BitStackerNFT;

    const totlaHashes = (await contract.totalPresaleTerraHashesSold()).add(await contract.totalPublicsaleterraHashesSold()).toString();
    return Number(totlaHashes);

}

const getHashes = async (user: string) => {

    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/d9fb7fe853c94891811d279e8055defe");
    const contract = new Contract(addresses.BitStackerNFT, abis.BitStackerNFT, provider) as BitStackerNFT;

    const hashes = await contract.hashesOf(user);
    const hashesUserHave = hashes._vipBlackHash.add(hashes._vipBlueHash).add(hashes._blackHash).add(hashes._blueHash).toString();
    return Number(hashesUserHave);

}

const updateHoldersList = () => {
    workbook.xlsx.readFile(filePath)
        .then(async () => {

            var worksheet = workbook.getWorksheet(sheetName);
            var addressColumn = worksheet.getColumn(1).values;
    
            holders.map((holder) => {
                const userIndex = addressColumn.findIndex((v) => v === holder);
                if (userIndex < 0) {
                    worksheet.addRow([holder])
                }
            })
    
            await workbook.xlsx.writeFile(filePath)
                .then(() => console.log('Users list is updated'))
                .catch(err => console.log(err.message));


        });
}

