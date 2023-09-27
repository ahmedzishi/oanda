const axios = require("axios");
require("dotenv").config();

const headers = {
  Authorization: "Bearer " + process.env.API_KEY,
};

const accountId = process.env.ACCOUNT_ID;

const units = 10000;

const oandaRestApi = process.env.OANDA_REST_API;

const accountUrl = `${oandaRestApi}/v3/accounts/${accountId}`;

const candlesUrl = `${oandaRestApi}/v3/instruments/`;

const orderUrl = `${oandaRestApi}/v3/accounts/${accountId}/orders`;

module.exports = {
  axios,
  headers,
  units,
  accountUrl,
  candlesUrl,
  orderUrl,
};
