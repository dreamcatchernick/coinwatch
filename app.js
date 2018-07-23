const axios = require('axios');

const bittrex = 'https://bittrex.com/api/v1.1/public/getorderbook?market=USDT-ADA&type=both';
const binance = 'https://api.binance.com/api/v1/depth?symbol=ADAUSDT&limit=5';
function run() {
    getPrice(bittrex).then(data => {
        console.log('===========Bittrex==============');
        data = data.result;
        const buyPrice = data.buy[0].Rate;
        const buyAmount = data.buy[0].Quantity;

        const sellPrice = data.sell[0].Rate;
        const sellAmount = data.sell[0].Quantity;

        const buyMessage = `buy price:${buyPrice} , amount:${buyAmount}`;
        const sellMessage = `sell price:${sellPrice} , amount:${sellAmount}`;
        console.log(buyMessage);
        console.log(sellMessage);
        console.log('================================');
    });

    getPrice(binance).then(data=> {
        console.log('===========Binance==============');
        const buyItem = data.bids[0];
        const buyPrice = buyItem[0];
        const buyAmount = buyItem[1];

        const sellItem = data.asks[0];
        const sellPrice = sellItem[0];
        const sellAmount = sellItem[1];

        const buyMessage = `buy price:${buyPrice} , amount:${buyAmount}`;
        const sellMessage = `sell price:${sellPrice} , amount:${sellAmount}`;
        console.log(buyMessage);
        console.log(sellMessage);
        console.log('================================');
    })
}

function getPrice(url) {
    return axios.get(url)
                .then(response => {
                    // console.log(response);
                    return response.data;
                })
                .catch(error => {
                    console.log(error.message);
                })
}

setInterval(run, 4000);
