const views = require("../views/views");
const gmail = require("../gmail/gmail");
const blockchain = require("../blockchain/blockcahin");

function viewEmail(domEmail) {
    alert(JSON.stringify(gmail.getEmailData(domEmail)));
}

module.exports = {
    viewEmail: viewEmail
};