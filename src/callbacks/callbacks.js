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
    const stackedEmails = Gmail.findStakedEmail();
    const emailData = Gmail.getEmailDataOld(stackedEmails[0].id);
    const hash = Blockchain.hash(
        emailData.from +
        emailData.to +
        emailData.subject +
        emailData.body +
        emailData.timestamp
    );
    console.log(hash);
}

function newEmail(id, url, body, xhr) {
    const stackedEmails = Gmail.findStakedEmail();
    const emailData = Gmail.getEmailDataOld(stackedEmails[0].id);
    const hash = Blockchain.hash(
        emailData.from +
        emailData.to +
        emailData.subject +
        emailData.body +
        emailData.timestamp
    );
    console.log(hash);
}

function onLoad() {
    const userEmail = window.gmail.get.manager_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");
    const stackedEmails = Gmail.findStakedEmail();
    const hashes = [];
    for (let i = 0; i < stackedEmails.length; i++) {
        const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
        const hash = Blockchain.hash(
            emailData.from +
            emailData.to +
            emailData.subject +
            emailData.body +
            emailData.timestamp
        );
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