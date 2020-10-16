"use strict";
const merge = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
    NODE_ENV: '"development"',
    modify: 2345678
});
