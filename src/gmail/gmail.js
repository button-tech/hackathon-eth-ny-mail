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

module.exports = {
    getEmailData: getEmailData
};