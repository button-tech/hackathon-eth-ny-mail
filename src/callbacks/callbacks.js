const views = require("../views/views");
const gmail = require("../gmail/gmail");
const blockchain = require("../blockchain/blockcahin");

function viewEmail(domEmail) {
    alert(JSON.stringify(gmail.getEmailData(domEmail)));
}

function httpEvent(params) {
    console.log(params)
    gmail.sortMails();
}

function sendEmail(url, body, data, response, xhr) {
    gmail.getLegacyIdFromSendMessage(response);
}

function newEmail(id, url, body, xhr) {
    console.log(id);
    console.log(url)
    console.log(body);
    console.log(xhr)
}

module.exports = {
    viewEmail: viewEmail,
    httpEvent: httpEvent,
    sendEmail: sendEmail,
    newEmail: newEmail
};