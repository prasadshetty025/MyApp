const express = require("express");
const bodyParser =require("body-parser");
const mongoose= require("mongoose");
const axios = require('axios');
const schedule=require('node-schedule')


const Coin=require("./Schema/schema");
const { count, collection } = require("./Schema/schema");
const { scheduleJob } = require("node-schedule");


const app=express();


mongoose.connect("mongodb+srv://PrasadShetty:S0nyX6IjFX4RDceR@cluster0.m95x7lg.mongodb.net/MyApp?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin", "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


 schedule.scheduleJob('*/30 * * * * *',()=>{

 let response = null;
 new Promise(async (resolve, reject) => {
   try {
     response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?', {
       headers: {
         'X-CMC_PRO_API_KEY': 'e8dc9a65-8acd-4a62-9714-32d041d26324',
        },
     });
   } catch(ex) {
     response = null;
     // error
     console.log(ex);
     reject(ex);
   }
   if (response) {
     // success
     const jsonAll = response.data.data;

     //Loop to to update all 100 coins
     for(var i=0;i<jsonAll.length;i++){
      var json=jsonAll[i];

  //data stored in DB
   const coin = new Coin({
    id: json.id,
    name: json.name,
    symbol: json.symbol,
    circulating_supply: json.circulating_supply,
    price: json.quote.USD.price,
    percent_change_24h: json.quote.USD.percent_change_24h,
    percent_change_7d: json.quote.USD.percent_change_7d,
    market_cap: json.quote.USD.market_cap,
    volume_24h: json.quote.USD.volume_24h,
    lastUpdated: Date.now()
  });



  //used to create and update the DB based on Coin ID
  const query={id:json.id};
  const update= {$set:{coin}};
  const option={upsert:true};

  collection.updateMany(query,update,option);






  resolve(jsonAll);
}
  }
 });
 console.log("I ran...");
 const io=app.get('io');

 io.emit("coinRefresh");

return;

})




app.get("/",(req, res,next)=>{
  Coin.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      coins: documents
    });
  });
 })






module.exports=app;
