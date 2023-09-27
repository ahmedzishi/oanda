const {
  isBullish,
  bullishFairValueGapPrices,
  bearishFairValueGapPrices,
  bullishTrendPrices,
  bearishTrendPrices,
  bullishThreeLineStrikePrices,
  bearishThreeLineStrikePrices,
  percentageChange,
  swingHighPrices,
} = require("../utils");

// 3 candle market order
const locateThreeLineStrike = (candleSet) => {
  return new Promise((resolve, reject) => {
    let data;
    for (let i = 1; i < candleSet.length; i++) {
      try {
        if (candleSet[i].mid) {
          if (
            isBullish(candleSet[i]) == true &&
            isBullish(candleSet[i + 1]) == true &&
            isBullish(candleSet[i + 2]) == true &&
            isBullish(candleSet[i + 3]) == false
          ) {
            const { price, takeProfit, stopLoss } =
              bearishThreeLineStrikePrices(candleSet[i].mid.c);
            data = {
              type: "bearish",
              candleSet: candleSet,
              price: price,
              takeProfit: takeProfit,
              stopLoss: stopLoss,
            };
            resolve(data);
          }

          if (
            isBullish(candleSet[i]) == false &&
            isBullish(candleSet[i + 1]) == false &&
            isBullish(candleSet[i + 2]) == false &&
            isBullish(candleSet[i + 3]) == true
          ) {
            const { price, takeProfit, stopLoss } =
              bullishThreeLineStrikePrices(candleSet[i].mid.c);
            data = {
              type: "bullish",
              candleSet: candleSet,
              price: price,
              takeProfit: takeProfit,
              stopLoss: stopLoss,
            };
            resolve(data);
          }
        }
      } catch (Error) {
        reject;
        return;
      }
    }
  });
};

// 3 candle market order
const locateSwing = (candleSet) => {
  return new Promise((resolve, reject) => {
    let data;
    for (let i = 1; i < candleSet.length; i++) {
      try {
        if (candleSet[i].mid) {
          if (
            candleSet[i].mid.h < candleSet[i + 1].mid.h &&
            candleSet[i + 2].mid.h < candleSet[i + 1].mid.h
          ) {
            swingLowPrices(candleSet[i].mid.c);
            data = {
              type: "swing low",
              candleSet: candleSet,
              price: price,
              takeProfit: takeProfit,
              stopLoss: stopLoss,
            };

            resolve(data);
          }

          if (
            candleSet[i].mid.l > candleSet[i + 1].mid.l &&
            candleSet[i + 2].mid.l > candleSet[i + 1].mid.l
          ) {
            const { price, takeProfit, stopLoss } = swingHighPrices(
              candleSet[i].mid.c
            );
            data = {
              type: "swing high",
              candleSet: candleSet,
              price: price,
              takeProfit: takeProfit,
              stopLoss: stopLoss,
            };

            resolve(data);
          }
        }
      } catch (Error) {
        reject;
        return;
      }
    }
  });
};

// 3 candle market order
const locateTrend = (candleSet) => {
  return new Promise((resolve, reject) => {
    let data;
    for (let i = 1; i < candleSet.length; i++) {
      try {
        if (candleSet[i].mid) {
          if (
            isBullish(candleSet[i]) == true &&
            isBullish(candleSet[i + 1]) == true &&
            isBullish(candleSet[i + 2]) == true
          ) {
            const { price, takeProfit, stopLoss } = bullishTrendPrices(
              candleSet[i].mid.c
            );
            data = {
              type: "bullish",
              candleSet: candleSet,
              price: price,
              takeProfit: takeProfit,
              stopLoss: stopLoss,
            };
            resolve(data);
          }

          if (
            isBullish(candleSet[i]) == false &&
            isBullish(candleSet[i + 1]) == false &&
            isBullish(candleSet[i + 2]) == false
          ) {
            const { price, takeProfit, stopLoss } = bearishTrendPrices(
              candleSet[i].mid.c
            );
            data = {
              type: "bearish",
              candleSet: candleSet,
              price: price,
              takeProfit: takeProfit,
              stopLoss: stopLoss,
            };
            resolve(data);
          }
        }
      } catch (Error) {
        reject;
        return;
      }
    }
  });
};

// 3 candle limit order
const locateFairValueGap = (candleSet) => {
  return new Promise((resolve, reject) => {
    for (let i = 1; i < candleSet.length; i++) {
      let data;
      try {
        if (
          candleSet[i].mid.l > candleSet[i + 2].mid.h &&
          candleSet[i + 1].mid.c > candleSet[i + 2].mid.h &&
          Math.abs(
            percentageChange(candleSet[i + 1].mid.c, candleSet[i + 1].mid.o)
          ) > 0.05
        ) {
          const { price, takeProfit, stopLoss } = bullishFairValueGapPrices(
            candleSet[i].mid.l,
            candleSet[i + 2].mid.l
          );
          data = {
            type: "bullish",
            candleSet: candleSet,
            price: price,
            takeProfit: takeProfit,
            stopLoss: stopLoss,
            percentageChange: Math.abs(
              percentageChange(candleSet[i + 1].mid.c, candleSet[i + 1].mid.o)
            ),
          };
          resolve(data);
        } else if (
          candleSet[i].mid.h < candleSet[i + 2].mid.l &&
          candleSet[i].mid.c > candleSet[i + 1].mid.l &&
          Math.abs(
            percentageChange(candleSet[i + 1].mid.c, candleSet[i + 1].mid.o)
          ) > 0.05
        ) {
          const { price, takeProfit, stopLoss } = bearishFairValueGapPrices(
            candleSet[i].mid.h,
            candleSet[i + 2].mid.h
          );
          data = {
            type: "bearish",
            candleSet: candleSet,
            price: price,
            takeProfit: takeProfit,
            stopLoss: stopLoss,
            percentageChange: Math.abs(
              percentageChange(candleSet[i + 1].mid.c, candleSet[i + 1].mid.o)
            ),
          };
          resolve(data);
        }
      } catch (Error) {
        reject;
        return;
      }
    }
  });
};

module.exports = {
  locateTrend,
  locateThreeLineStrike,
  locateFairValueGap,
  locateSwing,
};
