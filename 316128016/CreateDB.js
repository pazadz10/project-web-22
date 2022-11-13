var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const InsertData = (req,res)=>{
    var Q2 = "INSERT INTO maids SET ?";
    const csvFilePath= path.join(__dirname, "data.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "EMAIL": element.email,
            "FULL_NAME":element.NAME,
            "PHONE":element.PHONE,
            "CITY":element.city

        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
module.exports = { InsertData};
 