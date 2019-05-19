const Web3 = require('web3');
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

function stake(value, data) {
    return new Promise(resolve => {
        web3.eth.sendTransaction({
            from: selectedAddress,
            to: address,
            value: web3Utils.toWei(value),
            data: getCallData("stake", [data])
        })
            // .on('transactionHash', function(hash){
            //     console.log(hash);
            // })
            .on('confirmation', function(receipt) {
                console.log("test")
                resolve(receipt);
            })
            .on('error', console.error);
    });
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