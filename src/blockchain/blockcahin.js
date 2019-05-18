const web3Utils = require("web3-utils");

function hash(data) {
    return web3Utils.soliditySha3({t: 'string', v: data})
}

module.exports = {
    hash: hash
};