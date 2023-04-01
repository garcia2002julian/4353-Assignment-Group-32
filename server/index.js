const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const pkg = require("pg");
const app = express();
const bcrypt = require("bcrypt");
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

let hashedPassword = "";



app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  hashedPassword =  await bcrypt.hash(password, 10);
  console.log(hashedPassword)
  console.log(username)
  console.log(password)
  const insertQuery =
    "INSERT INTO usercredentials (username, password) VALUES ($1, $2)";

    const insertValues = [username, hashedPassword];

  const insertQueryInfo = "INSERT INTO userinfo (username) VALUES ($1)";

  const insertValuesInfo = [username];

  db.query(insertQuery, insertValues, (err, result) => {
    if (err) {
      res.send({ message: "Already exist username" });
    } else {
      db.query(insertQueryInfo, insertValuesInfo, (err, result)=>{
        if(err){
          console.log(err)
        }
        else{
          res.status(201).send({ messageRegister: "Register" });
        }
      })
    }
  });
});





app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const selectQuery = "SELECT * FROM usercredentials WHERE username = $1";
  const selectValues = [username];

  try {
    const result = await db.query(selectQuery, selectValues);
    if (result.rows.length > 0) {
      const hashedPassword = result.rows[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        res.status(200).send(result.rows);
      } else {
        console.log("Wrong password");
        res.status(401).send({ message: "wrong password or username" });
      }
    } else {
      console.log("User not found");
      res.status(401).send({ message: "wrong password or username" });
    }
  } catch (err) {
    res.status(401).send({ err: err });
  }

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
        res.send(result.rows);
      }
    }
  );
});




app.put("/update/:username", async (req, res) => {
  const username = req.params.username;
  const name = req.body.Name;
  const address1 = req.body.Address1;
  const address2 = req.body.Address2;
  const city = req.body.City;
  const state = req.body.State;
  const zip = req.body.Zipcode;
  const password = req.body.Password;
  
  const selectQuery = "SELECT * FROM usercredentials WHERE username = $1";
  const selectValues = [username];
  console.log(password)
  try {
    const result = await db.query(selectQuery, selectValues);
    if (result.rows.length > 0) {
      const hashedPassword = result.rows[0].password;
      console.log(hashedPassword)
      const isMatch = await bcrypt.compare(password, hashedPassword);
      console.log(isMatch)
      if (isMatch) {
        db.query(
          "UPDATE userinfo SET Name=$1, Address1=$2, Address2=$3, City=$4, State=$5, Zipcode=$6, newUser=0 WHERE username=$7",
          [name, address1, address2, city, state, zip, username],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result.rowCount > 0) {
                console.log("Updated")
                res.status(200).send(result.rows);
              } else {
                console.log(result);
                res.status(200).send({ message: "Wrong password" });
              }
            }
          }
        );
      } else {
        console.log("Wrong password");
        res.status(401).send({ message: "wrong password or username" });
      }
    } else {
      console.log("User not found");
      res.status(401).send({ message: "wrong password or username" });
    }
  } catch (err) {
    res.status(401).send({ err: err });
  }
});





app.put("/updatePassword/:username", async (req, res) => {
  const username = req.params.username;
  const password = req.body.Password;
  const newPassword = req.body.NewPassword;
  hashedPassword =  await bcrypt.hash(newPassword, 10);

  db.query(
    "UPDATE usercredentials SET password = $1 WHERE username=$2",
    [hashedPassword, username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err)
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
        console.log("Error");
        res.send(err);
      } else {
        console.log("Success");
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
