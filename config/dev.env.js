"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    modify: 123456,
    BASE_API: '"https://captcha.anji-plus.com/captcha-api"',
});
