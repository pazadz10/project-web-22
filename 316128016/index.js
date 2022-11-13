const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const app = express();
const path= require('path');
const sql = require('./db');
const fs = require('fs');
const CRUD = require('./CRUD');
const CreateDB=require('./CreateDB')
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
 


//לעשות את כל ה-set ups
// parse requests of contenttype: application/json
app.use(express.json());//להשתמש בג'ייסונים
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(bodyParser.json());


app.get('/CreateTable',CRUD.CreateTable,() => {
  console.log("yes.");
  })
 app.get('/InsertData1',CRUD.InsertData1)//insert to table "maids"
app.get('/InsertData2',CRUD.InsertData2)//insert to table "maids_languages"
app.get('/InsertData3',CRUD.InsertData3)//insert to table "ServiceTypes"
app.get("/", (req, res,next) => {
    res.render('Home');
  });
app.get("/About", (req, res,next) => {
    res.render('About');
  });

app.get("/Search",CRUD.Search);
app.get("/sign-up-maid",CRUD.signUp);
app.get("/Home", (req, res,next) => {
    res.render('Home');
  });
  app.get('/profile',CRUD.profilePage )
  app.post('/Login',CRUD.Login)
  app.post('/InsertCustomer',CRUD.InsertCustomer)
  app.post('/ShowAllCustomers',CRUD.ShowAllCustomers);
  app.post('/logout',CRUD.logout);
  app.post('/update',CRUD.update);
  app.post('/deleteCustomer',CRUD.deleteCustomer);
  app.listen(3030, () => {
    console.log("Server is running on port 3030.");
    });