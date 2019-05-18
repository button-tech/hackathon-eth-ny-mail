const views = require("../views/views");
const Gmail = require("../gmail/gmail");
const Blockchain = require("../blockchain/blockcahin");

function viewEmail(domEmail) {
    alert(JSON.stringify(Gmail.getEmailData(domEmail)));
}

function httpEvent(params) {
    console.log(params)
}

function sendEmail(url, body, data, response, xhr) {
    console.log(response);
    const id = Gmail.getLegacyIdFromSendMessage(response);
    setTimeout(() => {
        const emailData = Gmail.getEmailData(id);
        console.log(emailData);
        // const emailData = Gmail.getEmailDataOld(idOld);
        const neededDataToBeHashed = emailData.fromAddress + emailData.toAddress[0] + data["8"] + data["9"]["2"][0]["2"];
        console.log("Needed hashed data: " + neededDataToBeHashed);
        const hash = Blockchain.hash(neededDataToBeHashed);
        console.log(hash)
    }, 2000);
    // const stackedEmails = Gmail.findStakedEmail();
    // const emailData = Gmail.getEmailDataOld(stackedEmails[0].id);
    // console.log(emailData);
    // const hash = Blockchain.hash(
    //     emailData.from +
    //     emailData.to +
    //     emailData.subject +
    //     emailData.body
    //     // emailData.timestamp
    // );
    // console.log(hash);
}

function newEmail(id, url, body, xhr) {
    const stackedEmails = Gmail.findStakedEmail();
    const emailData = Gmail.getEmailDataOld(stackedEmails[0].id);
    const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + emailData.body;
    console.log(emailData);
    console.log("Needed hashed data: " + neededDataToBeHashed);
    const hash = Blockchain.hash(neededDataToBeHashed);
    console.log(hash);
}

function onLoad() {
    const userEmail = window.gmail.get.manager_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");
    const stackedEmails = Gmail.findStakedEmail();
    const hashes = [];
    for (let i = 0; i < stackedEmails.length; i++) {
        const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
        const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + emailData.body;
        console.log(emailData);
        console.log("Needed hashed data: " + neededDataToBeHashed);
        const hash = Blockchain.hash(neededDataToBeHashed);
        hashes.push(hash);
    }
    console.log(hashes);
}

module.exports = {
    viewEmail: viewEmail,
    httpEvent: httpEvent,
    sendEmail: sendEmail,
    newEmail: newEmail,
    onLoad: onLoad
};