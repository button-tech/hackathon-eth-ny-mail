"use strict";

console.log("Extension loading...");
const Callbacks = require("./callbacks/callbacks");
const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);
window.gmail = gmail;
window.$ = $;

gmail.observe.on("load", () => {
    Callbacks.onLoad();

    // gmail.observe.on("http_event", Callbacks.httpEvent);

    // setTimeout(Callbacks.httpEvent, 3000);
    gmail.observe.on("view_email", Callbacks.viewEmail);

    gmail.observe.on("new_email", Callbacks.newEmail);

    gmail.observe.after("send_message", Callbacks.sendEmail);

    gmail.observe.on('compose', Callbacks.compose);
});
