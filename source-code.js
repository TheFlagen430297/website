document.body.style.backgroundImage = `url(${getMetaData(`property`, `og:image`)})`;

let openStatus = false, openNumber = 100, allowButtonPress = true;
let URLData = {
    Reg: /https:\/\/(.*)(?:\.)theflagen430297|https:\/\/(.*)(?:\.)flagen/,
    FullURL: window.location.href,
    Title: undefined, Type: undefined, Sent: false
}, Statistics = {
    OwnerID: undefined, Country: undefined, Region: undefined,
    Timezone: undefined, IP: undefined, NumberOfVisits: undefined,
    FirstCreatedAt: undefined
}, OPN = [], OPM = 0;

CheckAndSend();

import('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js').then((module) => {
    $.get("https://ipinfo.io", (response) => {
        Statistics.Country = response.country; Statistics.Region = response.region;
        Statistics.Timezone = response.timezone; Statistics.IP = response.ip;
    }, "json");
});

//Headlines
fetch(`https://storage.theflagen430297.com/code/Headlines.json?update-cache=${Math.floor(Math.random() * 100)}`).then(input => input.json()).then(output => {
    let headline = document.getElementById("headline"),
        CHL = 0, link, color, MI,
        MR = 0, //Main Runs
        NOW, //Number of Words
        PIA = -1, //Position in Array
        PIW = 0, //Position in Word
        NOR = 0, //Number Of Runs
        TL = 0, //Text Length
        CS = ``; //Current String
    run();
    function run() {
        if (CHL === output.length) CHL = 0;
        let root = { text: output[CHL].text, link: output[CHL].link, color: output[CHL].color };
        if (root.link) link = ` href="${root.link}" class="link" target="_blank" `;
        else link = "";
        if (root.color) color = `style="color: ${root.color};"`;
        else color = "";
        if (!root.color && root.link) color = `class="link"`;
        CS = ``; NOW = output.length; MR++; NOR = 0; PIW = 0;
        if (MR > NOW) { MR = 0; PIA = -1; NOR = 0; return run(); }
        //CurrentHeadline++;
        TL = root.text.length;
        MI = setInterval(() => {
            NOR++;
            if (NOR > TL) { CHL++; clearInterval(MI); setTimeout(() => { return run() }, 3500); };
            CS = CS + root.text.charAt(PIW);
            headline.innerHTML = `<a${link}${color}>${CS}</a>`;
            PIW++;
        }, 50);
    }
});

//Other Pages
fetch(`https://storage.theflagen430297.com/code/OtherPages.json?update-cache=${Math.floor(Math.random() * 100)}`).then(input => input.json()).then(output => {
    let otherPages = document.getElementById(`other-pages`);
    for (let i = 0; i < output.length; i++) {
        const element = output[i];
        let otherPagesSlot = document.createElement(`a`); otherPagesSlot.id = `other-pages-slot-${element.id}`;
        otherPagesSlot.href = element.href; otherPagesSlot.classList.add(`link`);
        otherPagesSlot.innerText = `${element.text}`; otherPages.appendChild(otherPagesSlot);
    }
});

//Toolbar
fetch(`https://storage.theflagen430297.com/code/toolbar.json?update-cache=${Math.floor(Math.random() * 100)}`).then(input => input.json()).then(output => {
    let toolbar = document.getElementById(`toolbar-slots`),
        domain = {
            type: "",
            string: /https:\/\/(.*)\.theflagen430297\.com/
        };

    try {
        domain.type = domain.string.exec(window.location.href)[1];
    } catch (e) {
        domain.type = `null`;
}

    for (let i = 0; i < output.length; i++) {
        const element = output[i];
        if (element.skip) null;
        else {
            let toolbarSlot = document.createElement(`div`);
            toolbarSlot.id = `toolbar-slot-${element.id}`;
            if (domain.type === "beta") toolbarSlot.innerHTML = `<a href="https://${domain.type}.${element.href}" class="link">${element.text}</a>`;
            else toolbarSlot.innerHTML = `<a href="https://${element.href}" class="link">${element.text}</a>`;
            toolbar.appendChild(toolbarSlot);
            if (i === (output.length - 1)) {
                let othersElement = document.createElement(`div`);
                othersElement.innerHTML = `<a onclick="LoadOthersPage()" class="link" style="text-decoration: underline; text-decoration-color: #0ca1ed;">Others</a>`;
                toolbar.appendChild(othersElement);
            }
        }
    }
});

//Welcome Message (Console)
fetch(`https://type.fit/api/quotes`).then(info => info.json()).then(data => {
    let msg = data[Math.floor(Math.random() * data.length)];
    console.log(
        `%c\n┌────┬┐░░░░┌───┬┐░░░░░░░░░░░┌┐░┌┬───┬───┬───┬───┬───┐░░░░░░░░░\n│┌┐┌┐││░░░░│┌──┤│░░░░░░░░░░░││░││┌─┐│┌─┐│┌─┐│┌─┐│┌─┐│░░░░░░░░░\n└┘││└┤└─┬──┤└──┤│┌──┬──┬──┬─┤└─┘├┘┌┘││││├┘┌┘│└─┘├┘┌┘├──┬──┬┐┌┐\n░░││░│┌┐││─┤┌──┤││┌┐│┌┐││─┤┌┼┬─┐├┐└┐││││├─┘┌┴──┐│░│┌┤┌─┤┌┐│└┘│\n░░││░│││││─┤│░░│└┤┌┐│└┘││─┤│││░││└─┘│└─┘││└─┬──┘│░│├┤└─┤└┘││││\n░░└┘░└┘└┴──┴┘░░└─┴┘└┴─┐├──┴┘└┘░└┴───┴───┴───┴───┘░└┴┴──┴──┴┴┴┘\n░░░░░░░░░░░░░░░░░░░░┌─┘│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n░░░░░░░░░░░░░░░░░░░░└──┘░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n%c${msg.author} %conce said:\n%c${msg.text}`,
        `color: #ff4555;`,
        `color: #ececff; font-size: 25px; font-style: italic;`,
        `color: #b0b0c5; font-size: 20px;`,
        `color: #b0b0c5; font-size: 20px; font-style: italic;`
    );
});

if (URLData.Reg.test(URLData.FullURL)) {
    let Exe = URLData.Reg.exec(URLData.FullURL)[1], UpperCased = Exe.charAt(0).toUpperCase() + Exe.slice(1);
    URLData.Type = Exe; document.title = `${UpperCased} | ` + document.title; URLData.Title = document.title;
} else { URLData.Type = null; URLData.Title = document.title; }

function Browser() {
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,// Opera 8.0+
        isFirefox = typeof InstallTrigger !== 'undefined',// Firefox 1.0+
        isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)), // Safari 3.0+ "[object HTMLElementConstructor]" 
        isIE = /*@cc_on!@*/false || !!document.documentMode, // Internet Explorer 6-11
        isEdge = !isIE && !!window.StyleMedia, // Edge 20+
        isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime), // Chrome 1 - 79
        isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1), // Edge (based on chromium) detection
        isBlink = (isChrome || isOpera) && !!window.CSS; // Blink engine detection
    if (isFirefox) { OPN.push(" Firefox"); OPM = OPM + 1; }
    if (isChrome) { OPN.push(" Chrome"); OPM = OPM + 2; }
    if (isSafari) { OPN.push(" Safari"); OPM = OPM + 3; }
    if (isOpera) { OPN.push(" Opera"); OPM = OPM + 4; }
    if (isIE) { OPN.push(" Internet Explorer"); OPM = OPM + 5; }
    if (isEdge) { OPN.push(" Edge"); OPM = OPM + 6; }
    if (isEdgeChromium) { OPN.push(" EdgeChromium"); OPM = OPM + 7; }
    if (isBlink) { OPN.push(" Blink"); OPM = OPM + 8; }
    if (OPM === 1) return 1;
    else if (OPM === 10) return 10;
    else if (OPM === 17) return 17;
    else if (OPM === 0) return 0;
    else return -1;
}

function CheckAndSend() {
    Cookies();
    let int = setInterval(() => {
        if (Statistics.IP == undefined && Statistics.OwnerID == undefined || Statistics.IP == undefined || Statistics.OwnerID == undefined) return
        else { sendMessage(Browser(), URLData.Title, URLData.FullURL); clearInterval(int) }
    }, 1E3)
}

function Cookies() {
    fetch("https://storage.theflagen430297.com/code/uuid.js").then(w => w.text()).then(y => {
        let UUIDe = eval(y)
        if (document.cookie === "") document.cookie = `name={"OwnerID": "${UUIDe.generate()}", "FirstCreatedAt": "${new Date()}", "NumberOfVisits": 1, "Country": "${Statistics.Country}", "Region": "${Statistics.Region}", "Timezone": "${Statistics.Timezone}", "IP": "${Statistics.IP}"}; expires=Sun, 13 Dec 2071 00:00:00 UTC; path=/;`;
        else {
            let string = document.cookie.toString(); DelCookie()
            string = string.replace(/name=(.*)/g, "$1");
            let Cookie = JSON.parse(string);
            Statistics.NumberOfVisits = Number.parseInt(Cookie.NumberOfVisits) + 1;
            Statistics.FirstCreatedAt = Cookie.FirstCreatedAt; Statistics.OwnerID = Cookie.OwnerID;
            document.cookie = `name={"OwnerID": "${Statistics.OwnerID}", "FirstCreatedAt": "${Statistics.FirstCreatedAt}", "NumberOfVisits": "${Statistics.NumberOfVisits}", "Country": "${Statistics.Country}", "Region": "${Statistics.Region}", "Timezone": "${Statistics.Timezone}", "IP": "${Statistics.IP}"}; expires=Sun, 13 Dec 2071 00:00:00 UTC; path=/;`;
        }
    });
}

function DelCookie() {
    let string = document.cookie.toString();
    if (string === "") return console.log("There is no cookie to be cleared.");
    string = string.replace(/name=(.*)/g, "$1");
    document.cookie = `name=${string}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //console.log(`The cookie: ${string}\nHas been deleted.`);
}

function getMetaData(a, v) { return document.querySelector(`[${a}="${v}"]`).content; }

function LoadOthersPage() {
    if (!allowButtonPress) return;
    if (!openStatus) {
        openStatus = true; allowButtonPress = false;
        let interval = setInterval(() => {
            openNumber++; document.getElementById(`toolbar-container`).style.height = `${openNumber}px`;
            if (openNumber >= 170) {
                document.getElementById(`toolbar-container`).style.height = `170px`;
                clearInterval(interval); allowButtonPress = true;
            }
        }, 1);
    } else {
        openStatus = false; allowButtonPress = false;
        let interval = setInterval(() => {
            openNumber = openNumber - 5; document.getElementById(`toolbar-container`).style.height = `${openNumber}px`;
            if (openNumber <= 100) {
                document.getElementById(`toolbar-container`).style.height = `100px`;
                clearInterval(interval); allowButtonPress = true;
            }
        }, 1);
    }
}

function sendMessage(data, page, url) {
    //Sends statistical data to me so I can see how many people visit my site and also what platform they use :)
    try {
        if(getMetaData(`property`, `tf:sendmessage`) == "false") return console.log(
            `%cThe sendinging of statistical data has been %cDisabled %cfor this page`,
            `color: #b0b0c5; font-size: 20px; font-style: italic;`,
            `color: #ff4555; font-size: 20px; font-style: italic;`,
            `color: #b0b0c5; font-size: 20px; font-style: italic;`
        );
        else send(data, page, url)
    } catch (e) {
        send(data, page, url)
    }
    
    function send(data, page, url) {
        const request = new XMLHttpRequest();
        let BI = "";
        request.open("POST", "https://discord.com/api/webhooks/883272399162855434/dlIxT0dROHSryISAyuRE_GLp0QS92u_QFZ2HZslvWV3OK_nBVtKn4iYAIlwZ0OzYceHP");
        request.setRequestHeader('Content-type', 'application/json');
        if (data === 1) BI = `• **The Browser Is:** \`FireFox\`\n• **Number Value Total:** \`${Browser()}/1\``;
        else if (data === 3) BI = `• **The Browser Is:** \`Safari\`\n• **Number Value Total:** \`${Browser()}/3\``;
        else if (data === 10) BI = `• **The Browser Is:** \`Chrome\`\n• **Number Value Total:** \`${Browser()}/10\``;
        else if (data === 17) BI = `• **The Browser Is:** \`Edge with Chromium\`\n• **Number Value Total:** \`${Browser()}/17\``;
        else if (data === 0) BI = `• **The Browser Is Not Supported/Could Not be Detected**\n• **Number Value Total:** \`${Browser()}\``;
        else BI = `• **The Browser Names are:** \`${OPN}\`\n• **Number Value Total:** \`${Browser()}\``;
        let params = {
            username: `Website Tracker | theflagen430297.com`, avatar_url: `https://storage.theflagen430297.com/pictures/logo.png`,
            embeds: [{
                url: `${url}`, title: `${page}`, color: 2033618,
                description: `__Statistics__\n\n***User Info:***\n • **UUID:** \`${Statistics.OwnerID}\`\n • **IP:** \|\|\`${Statistics.IP}\`\|\|\n • **Country:** \`${Statistics.Country}\`\n • **Region:** \`${Statistics.Region}\`\n • **Timezone:** \`${Statistics.Timezone}\`\n • **Visits:** \`${Statistics.NumberOfVisits}\`\n • **First Joined:** \`${Statistics.FirstCreatedAt}\`\n\n***Browser Info:***\n • **Used Link:** \`${url}\`\n${BI}`,
            }]
        }; setTimeout(() => { request.send(JSON.stringify(params)) }, 10);
    }
}





//END