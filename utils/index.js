const isBullish = (candle) => {
  if (candle.mid.o < candle.mid.c) {
    return true;
  } else {
    return false;
  }
};

const percentageChange = (numOne, numTwo) => {
  const decreaseValue = numOne - numTwo;
  return (decreaseValue / numOne) * 100;
};

const isNotNan = (price, takeProfit, stopLoss) => {
  if (
    !Number.isNaN(price) &&
    !Number.isNaN(takeProfit) &&
    !Number.isNaN(stopLoss)
  ) {
    return true;
  } else {
    return false;
  }
};

const swingLowPrices = (priceValue) => {
  const p = Number(priceValue);
  const t = Number(p) + 0.0005;
  const s = Number(p) - 0.0003;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const swingHighPrices = (priceValue) => {
  const p = Number(priceValue);
  const t = Number(p) - 0.0005;
  const s = Number(p) + 0.0003;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const bullishThreeLineStrikePrices = (priceValue) => {
  const p = Number(priceValue);
  const t = Number(p) + 0.001;
  const s = Number(p) - 0.0005;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const bearishThreeLineStrikePrices = (priceValue) => {
  const p = Number(priceValue);
  const t = Number(p) - 0.001;
  const s = Number(p) + 0.0005;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const bullishTrendPrices = (priceValue) => {
  const p = Number(priceValue);
  const t = Number(p) + 0.0008;
  const s = Number(p) - 0.0004;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const bearishTrendPrices = (priceValue) => {
  const p = Number(priceValue);
  const t = Number(p) - 0.0008;
  const s = Number(p) + 0.0004;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const bullishFairValueGapPrices = (priceValue, stoLo) => {
  const p = Number(priceValue) - 0.0001;
  const t = Number(p) + 0.0015;
  const s = Number(stoLo) - 0.0005;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const bearishFairValueGapPrices = (priceValue, stoLo) => {
  const p = Number(priceValue) + 0.0001;
  const t = Number(p) - 0.0015;
  const s = Number(stoLo) + 0.0005;

  const price = Number(p.toFixed(5));
  const takeProfit = Number(t.toFixed(5));
  const stopLoss = Number(s.toFixed(5));

  return { price, takeProfit, stopLoss };
};

const orderCurrentlyProcessing = (orders, instrument) => {
  if (
    orders.filter(
      (order) =>
        (order.instrument == instrument && order.state == "PENDING") ||
        (order.instrument == instrument && order.state == "TRIGGERED")
    ).length > 0
  )
    return true;
  else {
    return false;
  }
};

const all_instrument_pairs = [
  `AUD_USD`,
  `AUD_CHF`,
  `AUD_HKD`,
  `AUD_JPY`,
  `AUD_NZD`,
  `AUD_SGD`,
  `AUD_USD`,
  `CAD_CHF`,
  `CAD_HKD`,
  `CAD_JPY`,
  `CAD_SGD`,
  `CHF_HKD`,
  `CHF_JPY`,
  `CHF_ZAR`,
  `EUR_AUD`,
  `EUR_CAD`,
  `EUR_CHF`,
  `EUR_CZK`,
  `EUR_DKK`,
  `EUR_GBP`,
  `EUR_HKD`,
  `EUR_HUF`,
  `EUR_JPY`,
  `EUR_NOK`,
  `EUR_NZD`,
  `EUR_PLN`,
  `EUR_SEK`,
  `EUR_SGD`,
  `EUR_TRY`,
  `EUR_USD`,
  `EUR_ZAR`,
  `GBP_AUD`,
  `GBP_CAD`,
  `GBP_CHF`,
  `GBP_HKD`,
  `GBP_JPY`,
  `GBP_NZD`,
  `GBP_PLN`,
  `GBP_SGD`,
  `GBP_USD`,
  `GBP_ZAR`,
  `HKD_JPY`,
  `NZD_CAD`,
  `NZD_CHF`,
  `NZD_HKD`,
  `NZD_JPY`,
  `NZD_SGD`,
  `NZD_USD`,
  `SGD_CHF`,
  `SGD_JPY`,
  `TRY_JPY`,
  `USD_CAD`,
  `USD_CHF`,
  `USD_CNH`,
  `USD_CZK`,
  `USD_DKK`,
  `USD_HKD`,
  `USD_HUF`,
  `USD_JPY`,
  `USD_MXN`,
  `USD_NOK`,
  `USD_PLN`,
  `USD_SEK`,
  `USD_SGD`,
  `USD_THB`,
  `USD_TRY`,
  `USD_ZAR`,
  `ZAR_JPY`,
];

const top_instrument_pairs = [
  `EUR_USD`,
  `USD_JPY`,
  `GBP_USD`,
  `USD_CHF`,
  `AUD_USD`,
  `USD_CAD`,
  `NZD_USD`,
];

const tradingTimeFrame = () => {
  const now = new Date().getHours();
  if (now >= 8 && now <= 16) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isBullish,
  percentageChange,
  isNotNan,
  bullishFairValueGapPrices,
  bearishFairValueGapPrices,
  orderCurrentlyProcessing,
  bullishTrendPrices,
  bearishTrendPrices,
  bullishThreeLineStrikePrices,
  bearishThreeLineStrikePrices,
  tradingTimeFrame,
  swingHighPrices,
  swingLowPrices,
  all_instrument_pairs,
  top_instrument_pairs,
};
