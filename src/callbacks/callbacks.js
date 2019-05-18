const views = require("../views/views");
const Gmail = require("../gmail/gmail");
const Blockchain = require("../blockchain/blockcahin");

function viewEmail(domEmail) {
    alert(JSON.stringify(Gmail.getEmailData(domEmail)));
}

function httpEvent(params) {
    console.log(params)
}

function compose(compose, composeType) {
    // compose type can be one of "reply" | "forward" | "compose"
    alert('Compose object: ' + compose + 'compose type: ' + composeType);
    var compose_ref = gmail.dom.composes()[0];
    gmail.tools.add_compose_button(compose_ref, "Stake and send", function() {
        compose.subject("Staked "+compose.subject());
        const emailData = Gmail.getEmailData(compose.email_id());
        const neededDataToBeHashed = emailData.fromAddress + emailData.toAddress[0]+ compose.subject() + compose.body();
        console.log("Needed hashed data: " + neededDataToBeHashed);
        const hash = Blockchain.hash(neededDataToBeHashed);
        const stake = prompt("Enter stake amount");
        Blockchain.stake(stake,hash)
            .then(e => {
                console.log(e);
                compose.send();
            });
        console.log(hash);
    }, '');
}

function sendEmail(url, body, data, response, xhr) {
    // return new Promise((resolve) => {
    //     const id = Gmail.getLegacyIdFromSendMessage(response);
    //     setTimeout(() => {
    //         const emailData = Gmail.getEmailData(id);
    //         const neededDataToBeHashed = emailData.fromAddress + emailData.toAddress[0]+ data["8"] + data["9"]["2"][0]["2"].split('<div dir="ltr">')[1].split("</div>")[0];
    //         console.log("Needed hashed data: " + neededDataToBeHashed);
    //         const hash = Blockchain.hash(neededDataToBeHashed);
    //         Blockchain.stake("10000000",hash)
    //         console.log(hash);
    //         resolve(hash);
    //     }, 2000);
    // });
}

async function newEmail(id, url, body, xhr) {
    const stackedEmails = Gmail.findStakedEmail();
    const emailData = Gmail.getEmailDataOld(stackedEmails[0].id);
    const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
    console.log("Needed hashed data: " + neededDataToBeHashed);
    const hash = Blockchain.hash(neededDataToBeHashed);
    const status = await Blockchain.checkStake(hash);
    if (status) {
        document.body.innerHTML = views.html.stakedMessage + document.body.innerHTML;
        document.getElementById("from").innerText = emailData.from;
        document.getElementById("subject").innerText = emailData.subject;
        document.getElementById("body").innerText = emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
    }
    console.log(hash);
}

async function onLoad() {
    const userEmail = window.gmail.get.manager_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");
    const stackedEmails = Gmail.findStakedEmail();
    const hashes = [];
    for (let i = 0; i < stackedEmails.length; i++) {
        const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
        const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
        console.log("Needed hashed data: " + neededDataToBeHashed);
        const hash = Blockchain.hash(neededDataToBeHashed);
        const status = await Blockchain.checkStake(hash);
        console.log(status);
    }
    console.log(hashes);
}

module.exports = {
    viewEmail: viewEmail,
    httpEvent: httpEvent,
    sendEmail: sendEmail,
    newEmail: newEmail,
    onLoad: onLoad,
    compose: compose
};