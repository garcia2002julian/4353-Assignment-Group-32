const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const pkg = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());



const { Client } = pkg;

const db = new Client({
  host: "db.zlvczfuzzkilcsiqdedm.supabase.co",
  user: "postgres",
  port: 5432,
  password: "YzcT1t6a3165Nz6T",
  database: "postgres",
});

db.connect();



app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const insertQuery =
    "INSERT INTO userinfo (username, password) VALUES ($1, $2)";
  const insertValues = [username, password];

  db.query(insertQuery, insertValues, (err, result) => {
    if (err) {
      res.send({ message: "Already exist username" });
    } else {
      res.status(201).send({ messageRegister: "Register" });
    }
  });
});



app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const selectQuery =
    "SELECT * FROM userinfo WHERE username = $1 AND password = $2";
  const selectValues = [username, password];

  db.query(selectQuery, selectValues, (err, result) => {
    if (err) {
      res.status(401).send({ err: err });
    } else {
      if (result.rows.length > 0) {
        res.status(200).send(result.rows);
      } else {
        console.log("Wrong password");
        res.status(401).send({ message: "wrong password or username" });
      }
    }
  });
});


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
        res.status(200).send(result.rows);
      }
    }
  );
});

app.put("/update/:username", (req, res) => {
  const fetchusernameData = req.params.username;
  const upname = req.body.Name;
  const upaddress1 = req.body.Address1;
  const upaddress2 = req.body.Address2;
  const upCity = req.body.City;
  const upState = req.body.State;
  const upZip = req.body.Zipcode;

  db.query(
    "UPDATE userinfo SET Name=$1, Address1=$2, Address2=$3, City=$4, State=$5, Zipcode=$6, newUser=0 WHERE username = $7",
    [upname, upaddress1, upaddress2, upCity, upState, upZip, fetchusernameData],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result.rows);
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
        res.status(200).send(result.rows);
      }
    }
  );
});



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
          console.log("Error")
          res.send(err);
        } else {
          console.log("Success")
          res.status(201).send({ messageRegister: "Success" });
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


module.exports = app;







