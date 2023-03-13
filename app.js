// T877420|14822975811|1|054601509297|c964636|9876543210|test@test.com|10-07-2022|01-03-2047|100|M|ADHO|||||9204754820OCADIJ

const express = require('express');
const cors = require('cors');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended : true}));
app.use(
    cors({
        origin : '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders : ['Content-Type']
    })
);

app.listen(port);

app.post('/testHash', (req, res)=>{
    let data = 'T877420|SayantanGhosh12032022|1||c964636|||10-07-2022|01-03-2047|100|M|ADHO|||||9204754820OCADIJ';
    let salt = '9204754820OCADIJ';
    let hash = crypto.createHash('sha512', salt).update(data).digest('hex');
    console.log(hash);
    res.send(hash);
})

app.post('/genHash', (req, res)=>{
    let salt = '9204754820OCADIJ';
    let data = req.body.plainPass.concat(salt);
    // console.log(data);
    let hash = crypto.createHash('sha512', salt).update(data).digest('hex');
    console.log(hash);
    res.send(hash);
})

app.post('/genTxnId', (req, res)=>{
    res.send('SayantanGhosh12032022')
})

app.post('/request', (req, res)=>{
    let requestData = req.body.data.toString();
    fs.writeFile('./records/temp.txt', requestData,(err)=>{
        if (err) throw err
        else{
            console.log('data stored temporarily');
        }
    })
    res.send('1');
})

app.post('/response', (req, res)=>{
    let responseData = req.body.msg.toString();
    console.log(responseData);
    let requestData = fs.readFile('temp.txt', 'utf8', function(err, data){
        if(err) throw err
        else{
            fileName = JSON.parse(data).txnId.toString().concat('.txt');
            fs.writeFile(fileName,'',(err)=>{
                if (err) throw err
            })
            fs.appendFile(fileName, data ,(err)=>{
                if (err) throw err
            })
            fs.appendFile(fileName, responseData,(err)=>{
                if (err) throw err
            })
        }
    });
    // res.redirect('http://127.0.0.1:5501/main.html');
})

app.post('/testFile', (req, res)=>{
    fs.appendFile('test.txt', req.body.data.toString(),(err)=>{
        if (err) throw err
    })
    res.send('1')
})