const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const parsingFolder = "elements";

fs.unlink(__dirname + "/views.js", (err) => {
    fs.readdir(__dirname + "/" + parsingFolder, (err, files) => {
        const html = {};
        const styles = {};
        const links = {};
        const scripts = {};

        files.forEach(async (fileName, index) => {
            const file = fs.readFileSync(`${__dirname}/${parsingFolder}/${fileName}`);
            const dom = new JSDOM(file);
            html[fileName.split(".")[0]] = dom.window.document.querySelector("body").innerHTML.split("\n").join("");
            styles[fileName.split(".")[0]] = dom.window.document.querySelector("style") ?
                dom.window.document.querySelector("style").innerHTML.split("\n").join("") :
                "";
            links[fileName.split(".")[0]] = dom.window.document.querySelector("link") ?
                Object.values(dom.window.document.getElementsByTagName("link")).map(x => x.href):
                [];
            scripts[fileName.split(".")[0]] = dom.window.document.querySelector("script") ?
                Object.values(dom.window.document.getElementsByTagName("script")).map(x => x.src):
                [];
            if (index === files.length-1) {
                fs.appendFileSync(__dirname + "/views.js", "module.exports = " + JSON.stringify({
                    html: html,
                    style: styles,
                    link: links,
                    script: scripts
                }));
            }

        });
    });
});
