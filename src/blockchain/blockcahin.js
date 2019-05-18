const Web3 = require('web3');
const keythereum = require('keythereum');
const web3Utils = require("web3-utils");
const { ABI, address } = require("./contractData");

if (!Web3.givenProvider) {
    alert("Need MetaMask!");
    return;
}
const web3 = new Web3(Web3.givenProvider);
const instance = new web3.eth.Contract(ABI, address);
const selectedAddress = web3.eth.accounts.givenProvider.selectedAddress;

function getCallData(methodName, parameters) {
    if (!instance.methods[methodName])
        throw new Error(`Method ${methodName} does not exist`);
    const data = instance.methods[methodName](...parameters).encodeABI();
    return data;
}

async function stake(value, data) {
    web3.eth.sendTransaction({
        from: selectedAddress,
        to: address,
        value: value,
        data: getCallData("stake", [data])
    })
        .on('transactionHash', function(hash){
            console.log(hash);
        })
        .on('receipt', function(receipt) {
            console.log(receipt);
        })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
}

function checkStake(hash) {
    return instance.methods["checkStake"](hash).call({from: selectedAddress});
}

function hash(data) {
    return web3Utils.soliditySha3({t: 'string', v: data})
}

module.exports = {
    hash: hash,
    stake: stake,
    checkStake: checkStake
};