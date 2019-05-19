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
    // alert('Compose object: ' + compose + 'compose type: ' + composeType);
    var compose_ref = gmail.dom.composes()[0];
    gmail.tools.add_compose_button(compose_ref, "Stake and send", function() {
        const stake = prompt("Enter Ethereum amount to stake");
        compose.subject(`💥 Staked:${stake} ETH. `+compose.subject());
        const emailData = Gmail.getEmailData(compose.email_id());
        const neededDataToBeHashed = emailData.fromAddress + emailData.toAddress[0]+ compose.subject() + compose.body();
        console.log("Needed hashed data: " + neededDataToBeHashed);
        const hash = Blockchain.hash(neededDataToBeHashed);
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
    const bodyEmail = emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
    const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + bodyEmail;
    console.log("Needed hashed data: " + neededDataToBeHashed);
    const hash = Blockchain.hash(neededDataToBeHashed);
    setTimeout(async () => {
        const status = await Blockchain.checkStake(hash);
        if (status) {
            $("body")[0].innerHTML = views.html.stakedMessage + $("body")[0].innerHTML;
            document.getElementById("main").style.display = "none";
            // for (let i in views.script) {
            //     addScript(views.script[i]);
            // }
            for (let i in views.style) {
                addStyle(views.style[i]);
            }
            // document.getElementById("add-mail").innerHTML += `
            //             <tr>
            //                 <td>${emailData.from}</td>
            //                 <td>${emailData.subject.split(':')[1]}</td>
            //                 <td>${emailData.subject}</td>
            //                 <td>${bodyEmail}</td>
            //             </tr>`;
            const data = [];
            for (let i = 0; i < stackedEmails.length; i++) {
                const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
                const bodyEmail = emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
                const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + bodyEmail;
                console.log("Needed hashed data: " + neededDataToBeHashed);
                const hash = Blockchain.hash(neededDataToBeHashed);
                const status = await Blockchain.checkStake(hash);
                if (status) {
                    data.push({
                        from: emailData.from,
                        subject: emailData.subject,
                        body: bodyEmail,
                        stake: Number(emailData.subject.split(":")[1].split(" ")[0])
                    });

                }
                console.log(status);
            }
            data.sort(function compare( a, b ) {
                if ( a.stake < b.stake ){
                    return 1;
                }
                if ( a.stake > b.stake ){
                    return -1;
                }
                return 0;
            });
            for (let i = 0; i < data.length; i++) {
                document.getElementById("add-mail").innerHTML += `
                            <tr>
                                <td>${data[i].from}</td>
                                <td>${data[i].stake} ETH</td>
                                <td>${data[i].subject}</td>
                                <td>${data[i].body}</td>
                            </tr>`;
            }
            document.getElementById("main").style.display = "block";
            document.getElementById("hide-stakes").addEventListener("click", () => {$("#main").remove()}, false)
            document.getElementById("charity").addEventListener("click", () => {
                const stake = prompt("💌 Donate for charity");
                Blockchain.donate(stake)
                    .then(hash => {
                        alert("Thank you good human!❤️" +
                            "\nYour good deed will be remembered forever!" +
                            "\n"+"https://rinkeby.etherscan.io/tx/"+hash);
                        copy("https://rinkeby.etherscan.io/tx/"+hash);
                    });

            }, false)
        }
    }, 5000);
    console.log(hash);
}

function copy(p) {
    const fakeTextArea = document.createElement('textarea');
    fakeTextArea.setAttribute('readonly', '');
    fakeTextArea.value = p;
    document.body.appendChild(fakeTextArea);
    fakeTextArea.select();
    document.execCommand('copy');
}

async function onLoad() {
    // setTimeout(async () => {
    //     const userEmail = window.gmail.get.manager_email();
    //     console.log("Hello, " + userEmail + ". This is your extension talking!");
    //     const stackedEmails = Gmail.findStakedEmail();
    //     const hashes = [];
    //      $("body")[0].innerHTML = views.html.stakedMessage + $("body")[0].innerHTML;
    //     document.getElementById("main").style.display = "none";
    //     // for (let i in views.script) {
    //     //     addScript(views.script[i]);
    //     // }
    //     for (let i in views.style) {
    //         addStyle(views.style[i]);
    //     }
    //     for (let i = 0; i < stackedEmails.length; i++) {
    //         const emailData = Gmail.getEmailDataOld(stackedEmails[i].id);
    //         const bodyEmail = emailData.body.split('<div dir="ltr">')[1].split("</div>")[0];
    //         const neededDataToBeHashed = emailData.from + emailData.to + emailData.subject + bodyEmail;
    //         console.log("Needed hashed data: " + neededDataToBeHashed);
    //         const hash = Blockchain.hash(neededDataToBeHashed);
    //         const status = await Blockchain.checkStake(hash);
    //         if (status) {
    //             document.getElementById("add-mail").innerHTML += `
    //                     <tr>
    //                         <td>${emailData.from}</td>
    //                         <td>1000000 WEI</td>
    //                         <td>${emailData.subject}</td>
    //                         <td>${bodyEmail}</td>
    //                     </tr>`;
    //         }
    //         console.log(status);
    //     }
    //     document.getElementById("main").style.display = "block";
    //     console.log(hashes);
    //     document.getElementById("hide-stakes").addEventListener("click", () => {$("#main").remove()}, false)
    // }, 3000);
}

function addScript(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    (document.body || document.head || document.documentElement).appendChild(script);
}

function addStyle(href) {
    const link = document.createElement('style');
    link.innerHTML = href;
    document.head.appendChild(link);
}

module.exports = {
    viewEmail: viewEmail,
    httpEvent: httpEvent,
    sendEmail: sendEmail,
    newEmail: newEmail,
    onLoad: onLoad,
    compose: compose
};