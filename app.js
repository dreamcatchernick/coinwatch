const axios = require('axios');

const bittrex = 'https://bittrex.com/api/v1.1/public/getorderbook?market=USDT-ADA&type=both';
const binance = 'https://api.binance.com/api/v1/depth?symbol=ADAUSDT&limit=5';
async function run() {
    const bittrexResponse = await getPrice(bittrex);

    const bittrexData = bittrexResponse.result;
    let bittrexBuyPrice = bittrexData.buy[0].Rate;
    bittrexBuyPrice = toPrecision(bittrexBuyPrice , 5);
    const bittrexBuyAmount = bittrexData.buy[0].Quantity;

    let bittrexSellPrice = bittrexData.sell[0].Rate;
    bittrexSellPrice = toPrecision(bittrexSellPrice, 5);
    const bittrexSellAmount = bittrexData.sell[0].Quantity;
    
    const bittrexBuyMessage = `Bittrex buy  price:${bittrexBuyPrice} , amount:${bittrexBuyAmount}`;
    const bittrexSellMessage = `Bittrex sell price:${bittrexSellPrice} , amount:${bittrexSellAmount}`;


    const binanceResponse = await getPrice(binance);
    let binanceBuyPrice = binanceResponse.bids[0][0];
    binanceBuyPrice = toPrecision(binanceBuyPrice , 5);
    const binanceBuyAmount = binanceResponse.bids[0][1];

    let binanceSellPrice = binanceResponse.asks[0][0];
    binanceSellPrice = toPrecision(binanceSellPrice, 5);
    const binanceSellAmount = binanceResponse.asks[0][1];

    const binanceBuyMessage = `Binance buy  price:${binanceBuyPrice} , amount:${binanceBuyAmount}`;
    const binanceSellMessage = `Binance sell price:${binanceSellPrice} , amount:${binanceSellAmount}`;

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(bittrexBuyMessage);
    console.log(binanceSellMessage);
    console.log('================================');
    console.log(bittrexSellMessage);
    console.log(binanceBuyMessage);
}

async function getPrice(url) {
    const response = await axios.get(url);
    return response.data;
}

function toPrecision(num, decimalPlace) {
    return Number(num).toFixed(decimalPlace);
}

setInterval(run, 10000);
