//import express from "express";

//import bodyParser from "body-parser";
//import mysql from "mysql";
//import cors from "cors";
//import fs from "fs";
//import pkg from "pg";

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const pkg = require("pg");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// const db = mysql.createConnection({
//     user:'root',
//     host: 'localhost',
//     password: '12345678910jJ@',
//     database: 'user'
// });

// var db=mysql.createConnection({
//     host:"webappgasquota.mysql.database.azure.com",
//     user:"gasquota1",
//     password:"12345678910jJ@",
//     database:"user",
//     port:3306,
//     ssl:{ca:fs.readFileSync("C:\\Users\\Johnny\\Desktop\\Project 2\\4353-Assignment-Group-32-main\\server\\DigiCertGlobalRootCA.crt.pem")}});

// var db=mysql.createConnection({
// host:"webappgasquota.mysql.database.azure.com",
// user:"gasquota1",
// password:"12345678910jJ@",
// database:"user",
// port:3306,
// ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

// var db=mysql.createConnection({
//     host:"webappgasquota.mysql.database.azure.com",
//     user:"gasquota1",
//     password:"12345678910jJ@",
//     database:"user",
//     port:3306,
//     ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

const { Client } = pkg;

const db = new Client({
  host: "db.zlvczfuzzkilcsiqdedm.supabase.co",
  user: "postgres",
  port: 5432,
  password: "YzcT1t6a3165Nz6T",
  database: "postgres",
});

db.connect();

// db.connect(
//     function (err) {
//     if (err) {
//         console.log("!!! Cannot connect !!! Error:");
//         throw err;
//     }
//     else
//     {
//        console.log("Connection established.");
//     }
// });

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const insertQuery =
    "INSERT INTO userinfo (username, password) VALUES ($1, $2)";
  const insertValues = [username, password];

  db.query(insertQuery, insertValues, (err, result) => {
    if (err) {
      res.send({ message: "Already exist username" });
    } else {
      res.send({ messageRegister: "Register" });
    }
  });
});

// app.post('/RegisterProfile', (req, res)=>{
//     const username = req.body.username
//     const name = req.body.username

// })

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const selectQuery =
    "SELECT * FROM userinfo WHERE username = $1 AND password = $2";
  const selectValues = [username, password];

  db.query(selectQuery, selectValues, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.rows.length > 0) {
        res.send(result.rows);
      } else {
        console.log("Wrong password");
        res.send({ message: "wrong password or username" });
      }
    }
  });
});

// app.get('/getUserInfo', (req, res)=>{
//     // db.query('SELECT * from userinfo', (err, result) =>{
//     //     if (err){
//     //         console.log("Error")
//     //     } else{
//     //         res.send(result)
//     //     }
//     // });
//     res.send({
//         "username": "Random1",
//         "password": "1234567",
//         "full name": "RandomUser1",
//         "address 1": "1203 Clear Lake",
//         "address 2": null,
//         "city": "Houston",
//         "state": "Texas",
//         "zipcode": "77477",
//         "newuser": 1
//     })

// })

app.get("/getUserInfo/:username", (req, res) => {
  const fetchusernameData = req.params.username;

  db.query(
    "SELECT * FROM userinfo WHERE username = $1",
    [fetchusernameData],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "Error fetching data" });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.put("/update/:username", (req, res) => {
  const username = req.params.username;
  const name = req.body.Name;
  const address1 = req.body.Address1;
  const address2 = req.body.Address2;
  const city = req.body.City;
  const state = req.body.State;
  const zip = req.body.Zipcode;
  const password = req.body.Password;
  const newPassword = req.body.NewPassword;
  console.log(username);
  console.log(password);
  console.log(newPassword);

  db.query(
    "UPDATE userinfo SET Name=$1, Address1=$2, Address2=$3, City=$4, State=$5, Zipcode=$6, newUser=0 WHERE username=$7 and password=$8",
    [name, address1, address2, city, state, zip, username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.rowCount > 0) {
        } else {
          console.log("Wrong password");
          res.send({ message: "Wrong password" });
        }
      }
    }
  );
  if (newPassword != "")
    db.query(
      "UPDATE userinfo SET password = $1, newUser=0 WHERE username=$2 and password=$3",
      [newPassword, username, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.rows);
        }
      }
    );
});

app.get("/getHistoryOfUser/:username", (req, res) => {
  const fetchusernameData = req.params.username;
  db.query(
    "SELECT * FROM userhistory WHERE username=$1",
    [fetchusernameData],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});

// app.post('/submitQuota', (req, res)=>{
//     const gallonR = req.body.gallon_req;
//     const deliveryA = req.body.delivery_add;
//     const day = req.body.date;
//     const suggestprice = req.body.suggest_p;
//     const total = req.body.total_amount
//     // Send to Database using mysql or any other database software afterwards update userstatus from DB to recurring user.

//     // db.query('SELECT * FROM userinfo WHERE username = ? AND password = ?', [username_, password_], (err, result)=>{
//     //     if (err){
//     //         res.send({err:err})
//     //     }

//     //     if (result.length > 0){
//     //         res.send(result);
//     //     } else{
//     //         console.log("Wrong password")
//     //         res.send({message:"wrong password or username"});
//     //     }
//     // })

//     //

//     console.log(gallonR);
//     console.log(deliveryA);
//     console.log(day);
//     console.log(suggestprice);
//     console.log(total);
//     res.send('POST ROUTE REACHED')
// })

app.post("/submitQuota", (req, res) => {
  const GallonsRequested = req.body.gallon_req;
  const DeliveryAddress = req.body.delivery_add;
  const DeliveryDate = req.body.date;
  const SuggestedPrice = req.body.suggest_p;
  const TotalAmountDue = req.body.total_amount;
  const username = req.body.username;

  console.log(GallonsRequested);
  console.log(DeliveryAddress);
  console.log(DeliveryDate);
  console.log(SuggestedPrice);
  console.log(TotalAmountDue);
  console.log(username);

  db.query(
    "INSERT into userhistory (GallonsRequested,DeliveryAddress,DeliveryDate,SuggestedPrice,TotalAmountDue,username) VALUES($1, $2, $3, $4, $5, $6)",
    [
      GallonsRequested,
      DeliveryAddress,
      DeliveryDate,
      SuggestedPrice,
      TotalAmountDue,
      username,
    ],
    (err, result) => {
      if (err) {
        console.log("Error");
        res.send(err);
      } else {
        console.log("Success");
        res.send({ messageRegister: "Success" });
      }
    }
  );
});

app.put("/updateStatus/:username", (req, res) => {
  const fetchusername = req.params.username;
  db.query(
    "UPDATE userinfo SET neverUseQuota = $1 WHERE username = $2",
    [0, fetchusername],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});

// db.query('UPDATE userinfo SET neverUseQuota = 0 WHERE username = ? ', [username], (err, result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         res.send(result)
//     }
// })

// app.get('/getHistroyofUser', (req, res)=>{

//     res.send([{
//         "Gallons Requested": 50.12,
//         "Delivery Address": "Clear Lake",
//         "Delivery Date": "02/02/2022",
//         "Suggested Price": "4.25",
//         "Total Amount Due": 213.58,
//     },
//     {
//         "Gallons Requested": 35.12,
//         "Delivery Address": "Clear Lake",
//         "Delivery Date": "02/05/2022",
//         "Suggested Price": "6.25",
//         "Total Amount Due": 359.58,
//     },
//     {
//         "Gallons Requested": 6753.12,
//         "Delivery Address": "Random address 1235",
//         "Delivery Date": "02/09/2023",
//         "Suggested Price": "7.25",
//         "Total Amount Due": 359.58,
//     }
// ])
// })

// Send to Database using mysql or any other database software afterwards update userstatus from DB to recurring user.

// db.query('SELECT * FROM userinfo WHERE username = ? AND password = ?', [username_, password_], (err, result)=>{
//     if (err){
//         res.send({err:err})
//     }

//     if (result.length > 0){
//         res.send(result);
//     } else{
//         console.log("Wrong password")
//         res.send({message:"wrong password or username"});
//     }
// })

//

//app.listen(3001, () => console.log("Server running on 3001"));
module.exports = app;
