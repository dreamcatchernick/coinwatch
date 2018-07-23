const axios = require('axios');

const bittrex = 'https://bittrex.com/api/v1.1/public/getorderbook?market=USDT-ADA&type=both';
const binance = 'https://api.binance.com/api/v1/depth?symbol=ADAUSDT&limit=5';
async function run() {
    const bittrexResponse = await getPrice(bittrex);

    const bittrexData = bittrexResponse.result;
    const bittrexBuyPrice = bittrexData.buy[0].Rate;
    const bittrexBuyAmount = bittrexData.buy[0].Quantity;

    const bittrexSellPrice = bittrexData.sell[0].Rate;
    const bittrexSellAmount = bittrexData.sell[0].Quantity;

    const bittrexBuyMessage = `Bittrex buy price:${bittrexBuyPrice} , amount:${bittrexBuyAmount}`;
    const bittrexSellMessage = `Bittrex sell price:${bittrexSellPrice} , amount:${bittrexSellAmount}`;


    const binanceResponse = await getPrice(binance);
    const binanceBuyPrice = binanceResponse.bids[0][0];
    const binanceBuyAmount = binanceResponse.bids[0][1];

    const binanceSellPrice = binanceResponse.asks[0][0];
    const binanceSellAmount = binanceResponse.asks[0][1];

    const binanceBuyMessage = `Binance buy price:${binanceBuyPrice} , amount:${binanceBuyAmount}`;
    const binanceSellMessage = `Binance sell price:${binanceSellPrice} , amount:${binanceSellAmount}`;

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

setInterval(run, 4000);
