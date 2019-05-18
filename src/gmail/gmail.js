function getEmailData(domEmail) {
    const emailData = window.gmail.new.get.email_data(domEmail);
    console.log(domEmail)
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

function getLegacyIdFromSendMessage(response) {
    const id = response["2"]["6"][0]["1"]["3"]["5"]["3"][0];
    console.log(id);
    return id;
}

function sortMails() {
    // const ids = JSON.parse(localStorage.getItem(`sp/chrome/${gmail.get.manager_email()}/tl_data`)).map(x => x.ia);
    const ids = gmail.cache.emailIdCache;
    console.log(ids);
    console.log(gmail.new.get.email_data("msg-a:r6615609427463371726"))
    // const rows = $("table.F.cf.zt")[0].rows;
    // console.log(rows)
    // // let rowsHTML = [];
    // // for (let i = 0; i < rows.length; i++) {
    // //     rowsHTML.push("<tr>"+rows.item(i).innerHTML + "</tr>");
    // // }
    //
    // let row0 = rows[0].innerHTML;
    // let row3 = rows[2].innerHTML;
    // rows.item(0).innerHTML = row3;
    // rows.item(2).innerHTML = row0;
    // console.log(rows);
    // // console.log(window.$("table.F.cf.zt")[0].rows);
    // $("table.F.cf.zt")[0].rows = rows;
}

module.exports = {
    getEmailData: getEmailData,
    sortMails: sortMails,
    getLegacyIdFromSendMessage: getLegacyIdFromSendMessage
};