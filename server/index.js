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



app.get('/', (req, res)=>{
    db.query('SELECT * from userinfo', (err, result) =>{
        if (err){
            console.log("Error")
        } else{
            res.send(result)
        }
    });


})




app.listen(PORT, ()=>console.log("Server running on 3001"))