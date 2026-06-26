"use strict";

/* ==========================================================
   READING MODE MODULE
========================================================== */

const Reading = (() => {

    let button = null;

    let enabled = false;

    const CLASS_NAME = "reading-mode";

    /* ------------------------------------------------------
       INITIALIZE
    ------------------------------------------------------ */

    function init() {

        button = document.getElementById("js-reading-toggle");

        if (!button) {
            return;
        }

        button.addEventListener("click", toggle);

        document.addEventListener("keydown", keyboardShortcut);

        update();

    }

    /* ------------------------------------------------------
       TOGGLE
    ------------------------------------------------------ */

    function toggle() {

        enabled = !enabled;

        document.body.classList.toggle(CLASS_NAME, enabled);

        update();

    }

    /* ------------------------------------------------------
       ENABLE
    ------------------------------------------------------ */

    function enable() {

        if (enabled) {
            return;
        }

        enabled = true;

        document.body.classList.add(CLASS_NAME);

        update();

    }

    /* ------------------------------------------------------
       DISABLE
    ------------------------------------------------------ */

function disable() {

    /*
     * Selalu sinkronkan state.
     */

    enabled = false;

    document.body.classList.remove(CLASS_NAME);

    update();

}

    /* ------------------------------------------------------
       UPDATE UI
    ------------------------------------------------------ */

    function update() {

        if (!button) {
            return;
        }

        button.textContent = enabled
            ? "Exit Reading"
            : "Reading Mode";

        button.setAttribute(
            "aria-pressed",
            enabled.toString()
        );

    }

    /* ------------------------------------------------------
       KEYBOARD
    ------------------------------------------------------ */

    function keyboardShortcut(event) {

        if (
            event.target.matches(
                "input, textarea, select"
            )
        ) {
            return;
        }

        if (
            event.key.toLowerCase() === "r"
            && !event.ctrlKey
            && !event.altKey
            && !event.metaKey
        ) {

            event.preventDefault();

            toggle();

        }

        if (
            event.key === "Escape"
            && enabled
        ) {

            disable();

        }

    }

    /* ------------------------------------------------------
       STATUS
    ------------------------------------------------------ */

    function isEnabled() {

        return enabled;

    }

    /* ------------------------------------------------------
       PUBLIC API
    ------------------------------------------------------ */

    return {

        init,

        toggle,

        enable,

        disable,

        isEnabled

    };

})();