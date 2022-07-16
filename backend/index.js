const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const sqldb= require("mssql")


const app = express();

app.use(cors());
app.use(bodyparser.json());


// database connection

const db ={
    user:"Interadmin",
    password:"IN^$#@~!()",
    server:"192.168.30.95",
    database:"DB_INTERNSHIP",
    port:1433,
    options: {
        encrypt:true,
        trustServerCertificate:true,
    }
}

// check connection

sqldb.connect(db,err=>{
    if (err){console.log(err,'dberr');}
    console.log('database connected....')
})

// get all data

app.get('/user',(req,res)=>{
  
    let qr = `SELECT * FROM hellotble`;

    sqldb.query(qr,(err,result)=>{
       
        if(err)
        {
            console.log(err,'errs');
        }

        else if(result.recordset.length>0)
        {
            res.json({
                message:'all user data',
                data:result.recordset
            });
        }
    });
});


// get single data


app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;
    let qr = `SELECT * FROM hellotble where id =${gID}`;

    sqldb.query(qr,(err,result)=>{
        if(err)
        {console.log(err)}
        else if(result.recordset.length>0)
        {
            res.json({
                message:'get single data',
                data:result.recordset
            });
        }
        else 
        {
            res.json({
                message:'data not found'
            })
        }
    });
})


// insert data 

app.post('/user',(req,res)=>{
    console.log(req.body,'createdata')

    let UserName = req.body.UserName;
    let eMail = req.body.eMail;
    let DOB = req.body.DOB;

    let qr = `insert INTO hellotble(Username,email,DOB)VALUES('${UserName}','${eMail}','${DOB}')`;

    sqldb.query(qr,(err,result)=>{
        console.log(result)
        if(err){console.log(err);}
        res.send({
            message:'data inserted'
        })

    })
})

// update data

app.put('/user/:id',(req,res)=>{
    
    console.log(req.body,'Updatedata')

    let gID = req.params.id;

    let UserName = req.body.UserName;
    let eMail = req.body.eMail;
    let DOB = req.body.DOB;

    let qr = `UPDATE hellotble set Username = '${UserName}', email= '${eMail}', DOB = '${DOB}' where id = ${gID}`;
console.log(qr);
    sqldb.query(qr,(err,result)=>{
        console.log(result)
        if(err){console.log(err);}
        res.send({
            message:'data updated'
        })
    })
})


// delete data


app.delete('/user/:id',(req,res)=>{
    
    console.log(req.body,'deletedata')

    let gID = req.params.id;

    let UserName = req.body.UserName;
    let eMail = req.body.eMail;
    let DOB = req.body.DOB;

    let qr = `DELETE from hellotble  where id = ${gID}`;
    sqldb.query(qr,(err,result)=>{
        console.log(result)
        if(err){console.log(err);}
        res.send({
            message:'data deleted'
        })
    })
})



app.listen(3000,()=>{
    console.log('server is running')
})