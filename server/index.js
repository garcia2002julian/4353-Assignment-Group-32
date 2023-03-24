import express from "express";

import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3001;

const db = mysql.createConnection({
  host: "webappgasquota.mysql.database.azure.com",
  user: "gasquota1",
  password: "12345678910jJ@",
  database: "user",
  port: 3306,
  ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") },
});

const users = {
  username1: {
    fullName: "RandomUser1",
    password: "password",
  },
};

app.post("/register", (req, res) => {
  const username_ = req.body.username;
  const password_ = req.body.password;
  db.query(
    "INSERT INTO userinfo (username, password) VALUES (?, ?)",
    [username_, password_],
    (err, result) => {
      if (err) {
        console.log("Error");
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/RegisterProfile", (req, res) => {
  const username = req.body.username;
  const name = req.body.username;
});

app.post("/login", (req, res) => {
  const username_ = req.body.username;
  const password_ = req.body.password;

  db.query(
    "SELECT * FROM userinfo WHERE username = ? AND password = ?",
    [username_, password_],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        console.log("Wrong password");
        res.send({ message: "wrong password or username" });
      }
    }
  );
});

app.get("/getUserInfo/:user", (req, res) => {
  console.log("getuserinfo", req.params.user);
  const user = req.params.user;
  db.query("SELECT * from userinfo WHERE username=?", [user], (err, result) => {
    if (err) {
      console.log("Error");
      res.send("Error");
    } else {
      console.log("result", result);
      res.send(result[0]);
    }
  });
  // console.log("user", user);
  // res.send({
  //   username: "Random1",
  //   password: "1234567",
  //   "full name": "RandomUser1",
  //   "address 1": "1203 Clear Lake",
  //   "address 2": null,
  //   city: "Houston",
  //   state: "Texas",
  //   zipcode: "77477",
  //   newuser: 1,
  // });
});

app.put("/update/:username", (req, res) => {
  console.log(req);
  const data = req.query.username;
  const name = req.body.Name;
  const address1 = req.body.Address1;
  const address2 = req.body.Address2;
  const city = req.body.City;
  const state = req.body.State;
  const zip = req.body.Zipcode;
  db.query(
    "UPDATE userinfo SET Name=?, Address1=?, Address2=?, City=?, State=?, Zipcode=?, newUser=0 WHERE username=? ",
    [name, address1, address2, city, state, zip, data],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/submitQuota", (req, res) => {
  const gallonR = req.body.gallon_req;
  const deliveryA = req.body.delivery_add;
  const day = req.body.date;
  const suggestprice = req.body.suggest_p;
  const total = req.body.total_amount;
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

  console.log(gallonR);
  console.log(deliveryA);
  console.log(day);
  console.log(suggestprice);
  console.log(total);
  res.send("POST ROUTE REACHED");
});

app.get("/viewhistory/:userid", (req, res) => {
  const userid = req.params.userid;
  //purchasehistory table will get added in our database once we connect to a DB
  db.query(
    "select * from purchasehistory where userid=?",
    userid,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => console.log("Server running on 3001"));
