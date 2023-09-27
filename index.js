const { headers } = require("./config");
const {
  getAccountInfo,
  getCandlesInfo,
  getOrderInfo,
  createOrder,
} = require("./api_calls");
const {
  locateTrend,
  locateFairValueGap,
  locateThreeLineStrike,
  locateSwing,
} = require("./strategy");
const {
  tradingTimeFrame,
  all_instrument_pairs,
  top_instrument_pairs,
} = require("./utils");
const config = { headers };

startProcess();

function startProcess() {
  getAccountInfo(config).then((data) =>
    console.log(`Current account balance: ${data.account.balance}\r\n\r\n`)
  );

  for (const instrument of top_instrument_pairs) {
    if (tradingTimeFrame() == true) {
      setTimeout(() => {
        orderProcessFairValueGap(instrument, "M1");
      }, 10000);

      setInterval(() => {
        if (tradingTimeFrame() == true) {
          setTimeout(() => {
            orderProcessFairValueGap(instrument, "M1");
          }, 15000);
        }
      }, 65000);
    }
  }
}

// THREE LINE STRIKE
function orderProcessThreeLineStrike(instrument, timeFrame) {
  const configCandles = {
    params: {
      granularity: timeFrame,
      count: "5",
    },
    headers,
  };
  getOrderInfo(config, instrument).then((orderPending) => {
    console.log(instrument, orderPending);
    if (orderPending !== true) {
      getCandlesInfo(configCandles, instrument)
        .then((response) => locateThreeLineStrike(response))
        .then((data) => {
          if (data.type) {
            console.log(
              `------------------------${instrument} ${data.type} three line strike detected----------------------\r\n\r\n`,
              data
            );
            if (data.type == "bullish") {
              createOrder(
                instrument,
                "MARKET",
                "long",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
            if (data.type == "bearish") {
              createOrder(
                instrument,
                "MARKET",
                "short",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  });
}

// TREND
function orderProcessTrend(instrument, timeFrame) {
  const configCandles = {
    params: {
      granularity: timeFrame,
      count: "4",
    },
    headers,
  };
  getOrderInfo(config, instrument).then((orderPending) => {
    console.log(instrument, orderPending);
    if (orderPending !== true) {
      getCandlesInfo(configCandles, instrument)
        .then((response) => locateTrend(response))
        .then((data) => {
          if (data.type) {
            console.log(
              `------------------------${instrument} ${data.type} trend detected----------------------\r\n\r\n`,
              data
            );
            if (data.type == "bullish") {
              createOrder(
                instrument,
                "MARKET",
                "long",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
            if (data.type == "bearish") {
              createOrder(
                instrument,
                "MARKET",
                "short",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  });
}

// SWING
function orderProcessSwing(instrument, timeFrame) {
  const configCandles = {
    params: {
      granularity: timeFrame,
      count: "4",
    },
    headers,
  };
  getOrderInfo(config, instrument).then((orderPending) => {
    console.log(instrument, orderPending);
    if (orderPending !== true) {
      getCandlesInfo(configCandles, instrument)
        .then((response) => locateSwing(response))
        .then((data) => {
          if (data.type) {
            console.log(
              `------------------------${instrument} ${data.type} swing detected ----------------------\r\n\r\n`,
              data
            );
            if (data.type == "swing high") {
              createOrder(
                instrument,
                "MARKET",
                "short",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
            if (data.type == "swing low") {
              createOrder(
                instrument,
                "MARKET",
                "long",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  });
}

// FAIR VALUE GAP
function orderProcessFairValueGap(instrument, timeFrame) {
  const configCandles = {
    params: {
      granularity: timeFrame,
      count: "4",
    },
    headers,
  };
  getOrderInfo(config, instrument).then((orderPending) => {
    console.log(instrument, orderPending);
    if (orderPending !== true) {
      getCandlesInfo(configCandles, instrument)
        .then((response) => locateFairValueGap(response))
        .then((data) => {
          if (data.type) {
            console.log(
              `------------------------${instrument} ${data.type} fair value gap detected by ${data.percentageChange} % ----------------------\r\n\r\n`,
              data
            );
            if (data.type == "bullish") {
              createOrder(
                instrument,
                "LIMIT",
                "long",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
            if (data.type == "bearish") {
              createOrder(
                instrument,
                "LIMIT",
                "short",
                data.price,
                data.takeProfit,
                data.stopLoss
              ).then((orderData) =>
                console.log(
                  orderData,
                  data.price,
                  data.takeProfit,
                  data.stopLoss
                )
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  });
}

function orderProcessMainStrategy(instrument, timeFrame) {
  const configCandles = {
    params: {
      granularity: timeFrame,
      count: "4",
    },
    headers,
  };
  getOrderInfo(config, instrument).then((orderPending) => {
    console.log(instrument, orderPending);
    if (orderPending !== true) {
      getCandlesInfo(configCandles, instrument)
        .then((response) => locateSwing(response))
        .then((data) => {
          if (data.type) {
            console.log(
              `------------------------${instrument} ${data.type} swing detected ----------------------\r\n\r\n`,
              data
            );
            orderProcessFairValueGap(instrument, "M1");
            setInterval(() => {
              orderProcessFairValueGap(instrument, "M1");
            }, 15000);
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  });
}
