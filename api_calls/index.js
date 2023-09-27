const { axios, units, accountUrl, candlesUrl, orderUrl } = require("../config");
const { orderCurrentlyProcessing } = require("../utils");

const getAccountInfo = (config) => {
  return new Promise((resolve, reject) => {
    axios
      .get(accountUrl, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject;
        return;
      });
  });
};

const getCandlesInfo = (config, instrument) => {
  return new Promise((resolve, reject) => {
    axios
      .get(candlesUrl + `${instrument}/candles`, config)
      .then((response) => {
        const candleSet = response.data.candles.reverse();
        resolve(candleSet);
      })
      .catch((error) => {
        console.log(error);
        reject;
        return;
      });
  });
};

const getOrderInfo = (config, instrument) => {
  return new Promise((resolve, reject) => {
    axios
      .get(orderUrl, config)
      .then((response) => {
        resolve(orderCurrentlyProcessing(response.data.orders, instrument));
      })
      .catch((error) => {
        console.log(error);
        reject;
        return;
      });
  });
};

const createOrder = (
  instrument,
  type,
  position,
  price,
  takeProfit,
  stopLoss
) => {
  return new Promise((resolve, reject) => {
    let orderPosition;
    if (position == "long") {
      orderPosition = units;
    }
    if (position == "short") {
      orderPosition = -units;
    }
    axios
      .post(
        orderUrl,
        {
          order: {
            type: type,
            instrument: instrument,
            units: orderPosition.toString(),
            price: price.toString(),
            takeProfitOnFill: {
              price: takeProfit.toString(),
            },
            stopLossOnFill: {
              price: stopLoss.toString(),
            },
          },
        },
        {
          headers: {
            Authorization: "Bearer " + process.env.API_KEY,
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject;
        return;
      });
  });
};

module.exports = {
  getAccountInfo,
  getCandlesInfo,
  getOrderInfo,
  createOrder,
};
