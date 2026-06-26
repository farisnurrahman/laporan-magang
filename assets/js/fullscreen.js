"use strict";

/* ==========================================================
   FULLSCREEN MODULE
========================================================== */

const Fullscreen = (() => {

    let button = null;
    let container = null;

    let fullscreen = false;

    /* ------------------------------------------------------
       INITIALIZE
    ------------------------------------------------------ */

    function init() {

        button = document.getElementById("js-fullscreen-toggle");

        container = document.documentElement;

        if (!button) {
            return;
        }

        button.addEventListener("click", toggle);

        document.addEventListener(
            "fullscreenchange",
            onFullscreenChange
        );

        update();

    }

    /* ------------------------------------------------------
       TOGGLE
    ------------------------------------------------------ */

    async function toggle() {

        if (!document.fullscreenEnabled) {

            console.warn(
                "Fullscreen API is not supported."
            );

            return;

        }

        try {

            if (!document.fullscreenElement) {

                await enter();

            } else {

                await exit();

            }

        } catch (error) {

            console.error(
                "Fullscreen Error:",
                error
            );

        }

    }

    /* ------------------------------------------------------
       ENTER
    ------------------------------------------------------ */

    async function enter() {

        if (container.requestFullscreen) {

            await container.requestFullscreen();

        }

    }

    /* ------------------------------------------------------
       EXIT
    ------------------------------------------------------ */

    async function exit() {

        if (document.exitFullscreen) {

            await document.exitFullscreen();

        }

    }

    /* ------------------------------------------------------
       EVENTS
    ------------------------------------------------------ */

function onFullscreenChange() {

    fullscreen = !!document.fullscreenElement;

    /*
     * Jika keluar dari Fullscreen (ESC),
     * paksa Reading Mode ikut dimatikan.
     */

    if (!fullscreen) {

        if (
            typeof Reading !== "undefined"
            && Reading.isEnabled()
        ) {

            Reading.disable();

        }

    }

    update();

}

    /* ------------------------------------------------------
       UPDATE BUTTON
    ------------------------------------------------------ */

    function update() {

        if (!button) {
            return;
        }

        button.textContent = fullscreen
            ? "Exit Fullscreen"
            : "Fullscreen";

        button.setAttribute(
            "aria-pressed",
            fullscreen.toString()
        );

    }

    /* ------------------------------------------------------
       STATUS
    ------------------------------------------------------ */

    function isEnabled() {

        return fullscreen;

    }

    /* ------------------------------------------------------
       PUBLIC API
    ------------------------------------------------------ */

    return {

        init,

        toggle,

        enter,

        exit,

        isEnabled

    };

})();