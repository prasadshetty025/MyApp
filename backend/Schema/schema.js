const mongoose= require("mongoose");

const coinSchema= mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  symbol: {type: String, required: true},
  price: {type: Number, required: true},
  percent_change_24h: {type: Number, required: true},
  percent_change_7d: {type: Number, required: true},
  market_cap: {type: Number, required: true},
  circulating_supply: {type: Number, required: true},
  volume_24h: {type: Number, required: true},
  lastUpdated:{ type: Date },
});



module.exports = mongoose.model('Coin', coinSchema);

//in database in creats a colllection in plural form of model named all letters in lower case
//therefore collection name is coins
