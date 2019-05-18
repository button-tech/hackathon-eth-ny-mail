"use strict";

console.log("Extension loading...");
const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);
window.gmail = gmail;

gmail.observe.on("load", () => {
    const userEmail = gmail.get.manager_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");

    gmail.observe.on("view_email", (domEmail) => {
        const emailData = gmail.new.get.email_data(domEmail);
        const id = emailData.legacy_email_id;
        const timestamp = emailData.timestamp;
        const subject = emailData.subject;
        const fromAddress = emailData.from.address;
        const fromName = emailData.from.name;
        const toAddress = emailData.to.map(x => x.address);
        const toName = emailData.to.map(x => x.name);
        const contentHTML = emailData.content_html;
        const note = `
        Email ID: ${id}
        Timestamp: ${timestamp}
        Subject: ${subject}
        From:
            Address: ${fromAddress}
            Name: ${fromName}
        To: 
            Address: ${toAddress.join(", ")}
            Name: ${toName.join(", ")}
        HTML: ${contentHTML}`;
        alert(note);

        // Get current draft Email ID
        const draftId = gmail.get.compose_ids();
        alert("Last darftId: " + draftId);
        console.log("Email data:", emailData);
    });

    gmail.observe.on("new_email", function(id, url, body, xhr) {
        alert("id: " + id + "\nurl: " + url + '\nbody' + body + '\nxhr' + xhr);
    });

    gmail.observe.on("send_message", function(url, body, data, xhr) {
        alert("id: " + id + "\nurl: " + url + '\nbody' + body + '\nxhr' + xhr);

    });

    gmail.observe.on('compose', function(compose, composeType) {
        // compose type can be one of "reply" | "forward" | "compose"
        alert('Compose object: ' + compose + 'compose type: ' + composeType);
    });
});
