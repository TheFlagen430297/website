/**
 ** https://theflagen430297.com | https://flagen.co | TheFlagen430297's Services 2019-2023
 *#                                   beta-source-code.js
 *_                                      v5 - 3/2023
 *
 *?                 Issues with the code? Join https://join.flagen.co/discord
 */

let SearchString = /^(\w+:\/\/[^\/]+)(\/(?:[^\/]+\/)*)(?:[^\/]+\/?)?/;
let Part = SearchString.exec(window.location.href);
let parts = window.location.href.split('/'); parts.pop(); parts.pop();
let newUrl = parts.join('/') + '/';
if (parts.length < 4) newUrl = Part[1];
$(`#navigation-container #content #trademark #redirect`).attr(`href`, newUrl);;

getMetaData(`property`, `og:image`) ? $(`#background-container #picture`).attr(`src`, getMetaData(`property`, `og:image`)) : $(`#background-container #picture`).remove();
if ((Math.random() * (100 - 0) + 0) > 55) $(`#navigation-container #content #trademark #text #span`).addClass(`VALORANTFontBlink`);

$(`#navigation-container #mobile-container #toggle`).click(() => {
    if ($(`#content-container #mobile-container`).css(`display`) == `none`) {
        $(`#content-container #mobile-container`).css(`display`, `block`);
        $(`#content-container #content`).css(`display`, `none`);
    } else {
        $(`#content-container #mobile-container`).css(`display`, `none`);
        $(`#content-container #content`).css(`display`, `block`);
    }
});

if (screen.width <= 700) {
    $(`#background-container #BGG1`).addClass(`red-background`);
    $(`#background-container #BGG2`).addClass(`black-background`);
    $(`#content-container #content`).addClass(`tracking-in-expand`);
} else {
    $(`#background-container #picture`).addClass(`scale-up-center`);

    setTimeout(() => {
        $(`#background-container #picture`).removeClass(`scale-up-center`);
        $(`#background-container #BGG1`).addClass(`fade-in-longer red-background`);
        $(`#background-container #BGG2`).addClass(`fade-in-longer black-background`);
        setTimeout(() => {
            $(`#content-container`).addClass(`fade-in`);
            $(`#content-container`).css(`display`, `block`);
            $(`#content-container #content`).addClass(`slide-in-left`);
            setTimeout(() => {
                $(`#navigation-container`).addClass(`slide-in-top`);
                $(`#navigation-container #content`).addClass(`slide-in-top-longer`);
                $(`#navigation-container`).css(`display`, `block`);
            }, 700);
        }, 1E3);
    }, 1.5E3);
}

function getMetaData(attribute, variable) {
    try {
        let info = document.querySelector(`[${attribute}="${variable}"]`).content;
        if (!info) throw `typeError: Metadata value cannot be null`; else return info;
    } catch (error) {
        console.error(`\n%cTF_Error%c:\n%cError at getMetadata();\n"${attribute}" (Attribute) and/or "${variable}" (Variable) cannot be found or Metadata is null\n\nSee error for details:\n${error}`, `color: red; font-size: 40px; font-weight: bold; font-style: italic;`, `color: gray; font-size: 40px; font-style: italic;`, `color: gray; font-size: 20px; font-style: italic;`);
        return null;
    }
}

//Other Pages
fetch(`https://storage.theflagen430297.com/code/OtherPages.json?update-cache=${Math.floor(Math.random() * 100)}`).then(input => input.json()).then(output => {
    for (let i = 0; i < output.length; i++) {
        $('#content-container #mobile-container #links').append($('<li/>').append($(`<a/>`).attr("id", `mobile-pages-slot-${output[i].id}`).attr("href", output[i].href).addClass("link").text(output[i].text)));
        $('#content-container #other-links-container #links').append($('<li/>').append($(`<a/>`).attr("id", `other-pages-slot-${output[i].id}`).attr("href", output[i].href).addClass("link").text(output[i].text)));
    }
});


//Headlines
if ($(`#navigation-container #content #headlines`).css(`display`) == `none`) null; else {
    fetch(`https://storage.theflagen430297.com/code/Headlines.json?update-cache=${Math.floor(Math.random() * 100)}`).then(input => input.json()).then(output => {
        let CHL = 0, link, color, MI,
            MR = 0, //Main Runs
            NOW, //Number of Words
            PIA = -1, //Position in Array
            PIW = 0, //Position in Word
            NOR = 0, //Number Of Runs
            TL = 0, //Text Length
            CS = ``; //Current String
        recall();
        function recall() {
            if (CHL === output.length) CHL = 0;
            let root = { text: output[CHL].text, link: output[CHL].link, color: output[CHL].color };
            if (root.link) link = ` href="${root.link}" class="link" target="_blank" `; else link = "";
            if (root.color) color = `style="color: ${root.color};"`; else color = "";
            if (!root.color && root.link) color = `class="link"`;
            CS = ``; NOW = output.length; MR++; NOR = 0; PIW = 0;
            if (MR > NOW) { MR = 0; PIA = -1; NOR = 0; return recall(); }
            TL = root.text.length;
            MI = setInterval(() => {
                NOR++;
                if (NOR > TL) { CHL++; clearInterval(MI); setTimeout(() => { return recall() }, 3500); };
                CS = CS + root.text.charAt(PIW);
                $(`#navigation-container #content #headlines`).html(`<a${link}${color}>${CS}</a>`);
                PIW++;
            }, 50);
        }
    });
}

fetch(`https://storage.theflagen430297.com/code/toolbar.json?update-cache=${Math.floor(Math.random() * 100)}`).then(input => input.json()).then(output => {
    let highlights = document.getElementById(`highlighted-pages-container`),
        domain = { type: "", string: /https:\/\/(.*)\.theflagen430297\.com/ };
    try { domain.type = domain.string.exec(window.location.href)[1]; }
    catch (e) { domain.type = `null`; }

    for (let i = 0; i < output.length; i++) {
        const element = output[i];
        if (element.skip) null;
        else {
            let highlightedSlot = document.createElement(`div`);
            highlightedSlot.id = `highlighted-slot-${element.id}`;
            highlightedSlot.style = "float: left; padding: 10px;"
            if (domain.type === "beta") highlightedSlot.innerHTML = `<a href="https://${domain.type}.${element.href}" class="link">${element.text}</a>`;
            else highlightedSlot.innerHTML = `<a href="https://${element.href}" class="link">${element.text}</a>`;
            highlights.appendChild(highlightedSlot);
            if (i === (output.length - 1)) {
                let othersElement = document.createElement(`div`);
                othersElement.id = "others";
                othersElement.style = "padding: 10px; text-decoration: underline; text-decoration-color: #0ca1ed;";
                othersElement.onclick = function LoadOthersPage() {
                    if ($(`#content-container #other-links-container`).css(`display`) == `none`) {
                        $(`#content-container #other-links-container`).css(`display`, `block`);
                        $(`#content-container #content`).css(`display`, `none`);
                        $(`#navigation-container #highlighted-pages-container #others`).text(`Click to close`)
                    } else {
                        $(`#content-container #other-links-container`).css(`display`, `none`);
                        $(`#content-container #content`).css(`display`, `block`);
                        $(`#navigation-container #content #highlighted-pages-container #others`).text(`Others`)
                    }
                }
                othersElement.innerText = `Others`;
                highlights.appendChild(othersElement);
            }
        }
    }
});


fetch(`https://type.fit/api/quotes`).then(info => info.json()).then(data => {
    let msg = data[Math.floor(Math.random() * data.length)];
    console.log(
        `%c\n┌────┬┐░░░░┌───┬┐░░░░░░░░░░░┌┐░┌┬───┬───┬───┬───┬───┐░░░░░░░░░\n│┌┐┌┐││░░░░│┌──┤│░░░░░░░░░░░││░││┌─┐│┌─┐│┌─┐│┌─┐│┌─┐│░░░░░░░░░\n└┘││└┤└─┬──┤└──┤│┌──┬──┬──┬─┤└─┘├┘┌┘││││├┘┌┘│└─┘├┘┌┘├──┬──┬┐┌┐\n░░││░│┌┐││─┤┌──┤││┌┐│┌┐││─┤┌┼┬─┐├┐└┐││││├─┘┌┴──┐│░│┌┤┌─┤┌┐│└┘│\n░░││░│││││─┤│░░│└┤┌┐│└┘││─┤│││░││└─┘│└─┘││└─┬──┘│░│├┤└─┤└┘││││\n░░└┘░└┘└┴──┴┘░░└─┴┘└┴─┐├──┴┘└┘░└┴───┴───┴───┴───┘░└┴┴──┴──┴┴┴┘\n░░░░░░░░░░░░░░░░░░░░┌─┘│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n░░░░░░░░░░░░░░░░░░░░└──┘░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n%c${msg.author ? msg.author : `Unknown`} %conce said:\n%c${msg.text}`,
        `color: #ff4555;`,
        `color: #ececff; font-size: 25px; font-family: 'VALORANT', sans-serif;`,
        `color: #b0b0c5; font-size: 20px; font-family: Oxygen;`,
        `color: #b0b0c5; font-size: 20px; font-style: italic; font-family: Oxygen;`
    );
});