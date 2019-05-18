"use strict";

console.log("Extension loading...");
const Callbacks = require("./callbacks/callbacks");
const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);
window.gmail = gmail;

gmail.observe.on("load", () => {
    const userEmail = gmail.get.manager_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");

    gmail.observe.on("view_email", Callbacks.viewEmail);

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
