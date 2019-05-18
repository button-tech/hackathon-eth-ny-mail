const web3Utils = require("web3-utils");

function hash(data) {
    return web3Utils.soliditySha3({t: 'string', v: data})
}

console.log(hash('main@buttonwallet.comkk@buttonwallet.com💥 Stacked PAGASTA<div dir="ltr">NY Pls!!!</div>'))

module.exports = {
    hash: hash
};