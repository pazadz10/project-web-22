const { render } = require('pug');
const sql = require('./db');
const path = require('path');
const csv=require('csvtojson');
var SQL = require('./db');

const InsertCustomer = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    
    const NewCustomer = {
        "EMAIL" : req.body.EMAIL,
        "PASSWORD" : req.body.PASSWORD,
        "FULLNAME": req.body.full_name,
        "PHONE": req.body.phone_number,
        "CITY": req.body.City
    }
    const Q1 = "INSERT INTO CUSTOMERS SET ?";
    sql.query(Q1, NewCustomer, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error om creating customer " + err});
            console.log("error om creating customer " + err);
            return;            
        }
        console.log("created new customer ");
            res.cookie('EMAIL',NewCustomer.EMAIL)
            res.render('Home',{
                alert:"Welcome ,"+NewCustomer.FULLNAME
             } )
        return;
    });
};
const ShowAllCustomers = (req,res)=>{
    if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
        }
        const searchMaid={
            "ServiceType":req.body.ServiceType,
            "LANGUAGE":req.body.language,
            "CITY":req.body.city,
            }
    ServiceType=req.body.ServiceType;
    LANGUAGE=req.body.language;
    City=req.body.city;
    const Q2 = "SELECT * FROM maids WHERE CITY LIKE ?";
    const Q3 = "select * from maids_languages as l join maids as m on m.EMAIL=L.EMAIL WHERE CITY LIKE ? and LANGUAGE LIKE ?";
    const Q4 ="select * from serviceTypes as s join maids as m on m.EMAIL=s.EMAIL WHERE s.SERVICE_TYPE= ? and CITY LIKE ? ";
    const Q5="select * from serviceTypes as s join maids as m on m.EMAIL=s.EMAIL join maids_languages as l on m.EMAIL=L.EMAIL  WHERE s.SERVICE_TYPE= ? and l.LANGUAGE= ? and CITY LIKE ? ";
    if((ServiceType=='--Chose an option--' || ServiceType=='All')&&(LANGUAGE=='--Chose an option--' ||LANGUAGE=='All')){

        sql.query(Q2,searchMaid.CITY,(err, mysqlres)=>{
        
        if (err) {
            console.log("error in getting all customers " + err)
            res.status(400).send({message:"error in getting all customers " + err})
            return;
        }
        res.render('results', {
            alert:"Showing Result at:"+searchMaid.CITY,
            var1:"All Customers table",
            pple: mysqlres
        });
        return;
   });
}else if((ServiceType=='--Chose an option--' || ServiceType=='All')){
    sql.query(Q3,[searchMaid.CITY,searchMaid.LANGUAGE],(err, mysqlres)=>{
        if (err) {
            console.log("error in getting all customers " + err)
            res.status(400).send({message:"error in getting all customers " + err})
            return;
        }
        res.render('results', {
            alert:"Showing Result at:"+searchMaid.CITY,
            var1:"All Customers table",
            pple: mysqlres
        });
        return;
   });
}else if((LANGUAGE=='--Chose an option--' || LANGUAGE=='All')){
    sql.query(Q4,[searchMaid.CITY,searchMaid.ServiceType],(err, mysqlres)=>{
        if (err) {
       
            console.log("error in getting all customers " + err)
            res.status(400).send({message:"error in getting all customers " + err})
            return;
        }
        res.render('results', {
            alert:"Showing Result at:"+searchMaid.city,
            var1:"All Customers table",
            pple: mysqlres
        });
        return;
   });
} else {
    
    sql.query(Q5,[searchMaid.LANGUAGE,searchMaid.ServiceType,searchMaid.CITY],(err, mysqlres)=>{
      
        if (err) {

            console.log("error in getting all customers " + err)
            res.status(400).send({message:"error in getting all customers " + err})
            return;
        }
        res.render('results', {
            alert:"Showing Result at:"+searchMaid.CITY,
            var1:"All Customers table",
            pple: mysqlres
        });
        return;
   });
};}
const Login=(req,res)=>{
    if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
        }
    if(req.cookies.EMAIL!=null){
        res.render('Home',{
            alert:"Already loged in"
        })
    }else{
        const CUSTOMER ={ 
        "EMAIL" : req.body.EMAIL,
        "PASSWORD" : req.body.PASSWORD};
    sql.query('SELECT * FROM CUSTOMERS WHERE EMAIL =? and PASSWORD=? ',[CUSTOMER.EMAIL,CUSTOMER.PASSWORD],(err, mysqlres)=>{
        if (err) {
            console.log("error in login " + err)
            res.status(400).send({message:"error in login " + err})
            return;
        }
        if(mysqlres.length>0){
        res.cookie('EMAIL',mysqlres[0].EMAIL)
        res.render('Home',{
            alert:"Welcome ,"+mysqlres[0].FULLNAME
        })
        return;
        }else{
            res.render('Home',{
                alert:"Invalid Email or password, please try again."
            })
        }
    })
    }}

    const profilePage = (req,res)=>{
        if (!req.body) {
            res.status(400).send({message: "content can not be empty"});
            return;
            }else{
            if(!req.cookies.EMAIL){
                res.render('Home',{
                    alert:"Please Log In First"
                })
             }else{
            const user=req.cookies.EMAIL
            const Q6 = "SELECT * FROM CUSTOMERS WHERE EMAIL LIKE ?";
            sql.query(Q6,user,(err, mysqlres)=>{
            if (err) {
                console.log("error  " )
                res.status(400).send({message:"error " })
                return;
            }else{
            res.render('profile', {
                alert:"Hello , "+mysqlres[0].FULLNAME,
                var1:mysqlres[0].FULLNAME,
                COOKIE:req.cookies.EMAIL,
                pple: mysqlres
            })};
            return;
       })}
             }}
        
        
       
    const Search = (req,res)=>{
        if (!req.body) {
            res.status(400).send({message: "content can not be empty"});
            return;
            }
            if(!req.cookies.EMAIL){
            res.render('Home',{
                alert:"Please Log in first"
            })
            }
            
            res.render('Search');
            return;
       }
       const signUp = (req,res)=>{
        if (!req.body) {
            res.status(400).send({message: "content can not be empty"});
            return;
            }
            if(req.cookies.EMAIL){
            res.render('Home',{
                alert:"please log out before creating new acount."
            })
            }
            
            res.render('sign-up-maid');
            return;
       }
       const logout = (req,res)=>{
        if (!req.body) {
            res.status(400).send({
                message: "content cannot be empty"
            });
            return;
        }
        
        res.clearCookie('EMAIL');
        res.redirect('/Home');
        
    };
    const update = (req,res)=>{
        if (!req.body) {
            res.status(400).send({
                message: "content cannot be empty"
            });
            return;
        }
        
        const NewCustomer = {
            "EMAIL" : req.cookies.EMAIL,
            "PASSWORD" : req.body.PASSWORD,
            "FULLNAME": req.body.FULLNAME,
            "PHONE": req.body.phone_number,
            "CITY": req.body.CITY
        }
        const Q1 = "UPDATE CUSTOMERS SET PASSWORD=?,FULLNAME =?,PHONE=?,CITY=? WHERE EMAIL=?;";
        sql.query(Q1,[NewCustomer.PASSWORD,NewCustomer.FULLNAME,NewCustomer.PHONE,NewCustomer.CITY,NewCustomer.EMAIL], (err, mysqlres)=>{
            if (err) {
                res.status(400).send({message: "error om creating customer " + err});
                console.log("error on creating customer " + err);
                return;            
            }
            console.log("UPDATED ");
            res.render('Home');
            return;
        });
    };
    const deleteCustomer = (req,res)=>{
        if (!req.body) {
            res.status(400).send({
                message: "content cannot be empty"
            });
            return;
        }
        const Customer = req.cookies.EMAIL
        const DELETE = "DELETE FROM CUSTOMERS WHERE EMAIL=?;";
        sql.query(DELETE, Customer, (err, mysqlres)=>{
            if (err) {
                res.status(400).send({message: "error om creating customer " + err});
                console.log("error om creating customer " + err);
                return;            
            }
            console.log("created new student succesfully ");
            res.clearCookie('EMAIL');
            res.redirect('/Home');
            return;
        });
    };

       const CreateTable = (req,res)=> {
        var Q1 = " CREATE table CUSTOMERS( EMAIL VARCHAR(200) not null, PASSWORD VARCHAR(30) ,FULLNAME varchar(200) ,PHONE varchar(100),CITY varchar(100), primary key(EMAIL)  )";
        SQL.query(Q1,(err,mySQLres)=>{
            if (err) {
                console.log("error ", err);
                res.status(400).send({message: "error in creating table"});
                return;
            }
            console.log('created CUSTOMERS');
            return;
        })  
        var Q2 ="CREATE table MAIDS(EMAIL VARCHAR(200) not null,FULL_NAME varchar(200) ,PHONE varchar(100),CITY varchar(100),primary key(EMAIL))"
        SQL.query(Q2,(err,mySQLres)=>{
            if (err) {
                console.log("error ", err);
                res.status(400).send({message: "error in creating table"});
                return;
            }
            console.log('created MAIDS');
            return;
        })  
        var Q3="CREATE table maids_languages(EMAIL VARCHAR(200) not null,LANGUAGE VARCHAR(200),primary key(EMAIL),FOREIGN KEY (EMAIL) REFERENCES MAIDS(EMAIL))"
        SQL.query(Q3,(err,mySQLres)=>{
            if (err) {
                console.log("error ", err);
                res.status(400).send({message: "error in creating table"});
                return;
            }
            console.log('created maids_languages');
            return;
        }) 
        var Q4="CREATE table serviceTypes(EMAIL VARCHAR(200) not null,SERVICE_TYPE VARCHAR(200), primary key(EMAIL),FOREIGN KEY (EMAIL) REFERENCES MAIDS(EMAIL))"
        SQL.query(Q4,(err,mySQLres)=>{
            if (err) {
                console.log("error ", err);
                res.status(400).send({message: "error in creating table"});
                return;
            }
            console.log('created serviceTypes');
            res.send("table serviceTypes created");
            return;
        }) 
        
    }
    const InsertData1 = (req,res)=>{
        var Q2 = "INSERT INTO maids SET ?";

        const csvFilePath= path.join(__dirname, "data.csv");
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry1 = {
                "EMAIL": element.email,
                "FULL_NAME":element.NAME,
                "PHONE":element.PHONE,
                "CITY":element.city,
                

            }
        
            SQL.query(Q2,NewEntry1, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
           
        });
        })
        res.send("data read");
    };
    const InsertData2 = (req,res)=>{
        var Q3 = "INSERT INTO maids_languages SET ?";

        const csvFilePath= path.join(__dirname, "data.csv");
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry2 = {
                "EMAIL": element.email,
                "LANGUAGE":element.LANGUAGE

            }
        
            SQL.query(Q3,NewEntry2, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
           
        });
        })
        res.send("data read");
    };
    const InsertData3 = (req,res)=>{
        var Q4 = "INSERT INTO serviceTypes SET ?";

        const csvFilePath= path.join(__dirname, "data.csv");
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry3 = {
                "EMAIL": element.email,
                "SERVICE_TYPE":element.SERVICE_TYPE

            }
        
            SQL.query(Q4,NewEntry3, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
           
        });
        })
        res.send("data read");
    };
module.exports= {InsertCustomer,ShowAllCustomers,Login,profilePage,logout,Search,update,deleteCustomer,InsertData1,InsertData2,InsertData3,CreateTable,signUp};