const views = require("../views/views");
const Gmail = require("../gmail/gmail");
const blockchain = require("../blockchain/blockcahin");

function viewEmail(domEmail) {
    alert(JSON.stringify(Gmail.getEmailData(domEmail)));
}

function httpEvent(params) {
    console.log(params)
}

function sendEmail(url, body, data, response, xhr) {
    Gmail.getLegacyIdFromSendMessage(response);
}

function newEmail(id, url, body, xhr) {
    const stackedEmails = Gmail.findStakedEmail();
    const dataForHashing = [];
    for (let i = 0; i < stackedEmails.length; i++) {
        const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
        dataForHashing.push(emailData);
    }
    console.log(dataForHashing);
}

function onLoad() {
    const userEmail = window.gmail.get.manager_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");
    const stackedEmails = Gmail.findStakedEmail();
    const dataForHashing = [];
    for (let i = 0; i < stackedEmails.length; i++) {
        const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
        dataForHashing.push(emailData);
    }
    console.log(dataForHashing);
}

module.exports = {
    viewEmail: viewEmail,
    httpEvent: httpEvent,
    sendEmail: sendEmail,
    newEmail: newEmail,
    onLoad: onLoad
};