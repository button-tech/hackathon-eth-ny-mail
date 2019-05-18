const stackedAttribute = "💥 Stacked";

function getEmailData(domEmail) {
    const emailData = window.gmail.new.get.email_data(domEmail);
    return {
        id: emailData.legacy_email_id,
        timestamp: emailData.timestamp,
        subject: emailData.subject,
        fromAddress: emailData.from.address,
        fromName: emailData.from.name,
        toAddress: emailData.to.map(x => x.address),
        toName: emailData.to.map(x => x.name),
        contentHTML: emailData.content_html
    }
}

function getEmailDataOld(id) {
    const emailData = window.gmail.get.email_data(id);
    const thread = emailData.threads[Object.keys(emailData.threads)[0]];
    return {
        from: thread.from_email,
        to: thread.to[0].split("<")[1].split(">")[0],
        timestamp: thread.timestamp,
        body: thread.content_html,
        subject: thread.subject
    };
}

function getLegacyIdFromSendMessage(response) {
    const id = response["2"]["6"][0]["1"]["3"]["5"]["3"][0];
    return id;
}

function getEmails() {
    return gmail.get.visible_emails()
}

function findStakedEmail() {
    const regEx = new RegExp(stackedAttribute);
    const emails = getEmails();
    const stackedEmails = [];
    for (let i = 0; i < emails.length; i++) {
        if (regEx.test(emails[i].title)) {
            stackedEmails.push(emails[i]);
        }
    }
    return stackedEmails;
}

module.exports = {
    getEmailData: getEmailData,
    getEmailDataOld: getEmailDataOld,
    getLegacyIdFromSendMessage: getLegacyIdFromSendMessage,
    findStakedEmail: findStakedEmail
};