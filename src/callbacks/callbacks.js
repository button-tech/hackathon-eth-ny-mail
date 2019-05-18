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
    return new Promise((resolve) => {
        const id = Gmail.getLegacyIdFromSendMessage(response);
        setTimeout(() => {
            const emailData = Gmail.getEmailData(id);
            const neededDataToBeHashed = emailData.fromAddress + emailData.toAddress[0]+ data["8"] + data["9"]["2"][0]["2"].split('<div dir="ltr">')[1].split("</div>")[0];
            console.log("Needed hashed data: " + neededDataToBeHashed);
            const hash = Blockchain.hash(neededDataToBeHashed);
            console.log(hash);
            resolve(hash);
        }, 2000);
    });
}

function newEmail(id, url, body, xhr) {
    const stackedEmails = Gmail.findStakedEmail();
    const emailData = Gmail.getEmailDataOld(stackedEmails[0].id);
    const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
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
        const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
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