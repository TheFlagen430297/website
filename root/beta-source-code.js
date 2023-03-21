setTimeout(() => {
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
    }, 1000);
}, 1500);