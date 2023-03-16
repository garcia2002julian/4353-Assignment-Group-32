import express from 'express';

import bodyParser from 'body-parser';
import mysql from 'mysql'
import cors from 'cors'

const app =express()
app.use(cors())
app.use(bodyParser.json())
const PORT = 3001

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: '12345678910jJ@',
    database: 'user'
});

app.post('/register', (req, res)=>{
    const username_ = req.body.username;
    const password_ = req.body.password;
    db.query('INSERT INTO userinfo (username, password) VALUES (?, ?)', [username_, password_], (err, result) =>{
        if (err){
            console.log("Error")
        } else{
            res.send(result)
        }
    });
});


app.post('/RegisterProfile', (req, res)=>{
    const username = req.body.username
    const name = req.body.username
    
})


app.post('/login', (req, res)=>{
    const username_ = req.body.username;
    const password_ = req.body.password;

    db.query('SELECT * FROM userinfo WHERE username = ? AND password = ?', [username_, password_], (err, result)=>{
        if (err){
            res.send({err:err})
        }

        
        if (result.length > 0){
            res.send(result);
        } else{
            console.log("Wrong password")
            res.send({message:"wrong password or username"});
        }
    })
})



app.get('/getUserInfo', (req, res)=>{
    // db.query('SELECT * from userinfo', (err, result) =>{
    //     if (err){
    //         console.log("Error")
    //     } else{
    //         res.send(result)
    //     }
    // });
    res.send({
        "username": "Random1",
        "password": "1234567",
        "full name": "RandomUser1",
        "address 1": "1203 Clear Lake",
        "address 2": null,
        "city": "Houston",
        "state": "Texas",
        "zipcode": "77477",
        "newuser": 1
    })

})

app.post('/submitQuota', (req, res)=>{
    const gallonR = req.body.gallon_req;
    const deliveryA = req.body.delivery_add;
    const day = req.body.date;
    const suggestprice = req.body.suggest_p;
    const total = req.body.total_amount
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
    res.send('POST ROUTE REACHED')
})



app.listen(PORT, ()=>console.log("Server running on 3001"))
