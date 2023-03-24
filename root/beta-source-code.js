$(`#navigation-container #content #trademark`).click(() => {
    let SearchString = /(http(?:s|)):(?:\/*)(.*)\/(?:[a-zA-Z0-9.]*)/
    let Part = SearchString.exec(window.location.href)
    window.location.href = `${Part[1]}://${Part[2]}`;
})

$(`#navigation-container #content #trademark`).hover(() => {
    $(`#navigation-container #content #trademark #text #span`).addClass(`hover`)
}, () => {
    $(`#navigation-container #content #trademark #text #span`).removeClass(`hover`)
})

if ((Math.random() * (100 - 0) + 0) > 55) $(`#navigation-container #content #trademark #text #span`).addClass(`VALORANTFontBlink`);

$(`#navigation-container #mobile-container #toggle`).click(() => {
    if ($(`#content-container #mobile-container`).css(`display`) == `none`) {
        $(`#content-container #mobile-container`).css(`display`, `block`)
        $(`#content-container #content`).css(`display`, `none`)
    } else {
        $(`#content-container #mobile-container`).css(`display`, `none`)
        $(`#content-container #content`).css(`display`, `block`)
    }
})

if (screen.width < 700) {
    $(`#background-container #BGG1`).addClass(`red-background`);
    $(`#background-container #BGG2`).addClass(`black-background`);
    $(`#content-container #content`).addClass(`tracking-in-expand`);
} else {
    $(`#background-container #picture`).addClass(`scale-up-center`)

    setTimeout(() => {
        $(`#background-container #picture`).removeClass(`scale-up-center`)
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