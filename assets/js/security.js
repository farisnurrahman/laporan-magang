"use strict";

/* ==========================================================
   SECURITY MODULE
========================================================== */

const Security = (() => {

    /* ------------------------------------------------------
       INITIALIZE
    ------------------------------------------------------ */

    function init() {

        disableContextMenu();

        bindKeyboard();

        bindDragProtection();

        bindSelectionProtection();

    }

    /* ------------------------------------------------------
       CONTEXT MENU
    ------------------------------------------------------ */

    function disableContextMenu() {

        document.addEventListener("contextmenu", (event) => {

            event.preventDefault();

        });

    }

    /* ------------------------------------------------------
       KEYBOARD
    ------------------------------------------------------ */

    function bindKeyboard() {

        document.addEventListener("keydown", (event) => {

            if (shouldIgnore(event)) {
                return;
            }

            const key = event.key.toLowerCase();

            /* ---------- Developer Tools ---------- */

            if (event.key === "F12") {

                event.preventDefault();

                return;

            }

            if (
                event.ctrlKey &&
                event.shiftKey &&
                ["i", "j", "c"].includes(key)
            ) {

                event.preventDefault();

                return;

            }

            /* ---------- Browser ---------- */

            if (event.ctrlKey && key === "u") {

                event.preventDefault();

                return;

            }

            if (event.ctrlKey && key === "s") {

                event.preventDefault();

                return;

            }

            if (event.ctrlKey && key === "p") {

                event.preventDefault();

                return;

            }

        });

    }

    /* ------------------------------------------------------
       DRAG PROTECTION
    ------------------------------------------------------ */

    function bindDragProtection() {

        document.addEventListener("dragstart", (event) => {

            event.preventDefault();

        });

    }

    /* ------------------------------------------------------
       TEXT SELECTION
    ------------------------------------------------------ */

    function bindSelectionProtection() {

        document.addEventListener("selectstart", (event) => {

            if (event.target.closest(".c-toolbar")) {
                return;
            }

            event.preventDefault();

        });

    }

    /* ------------------------------------------------------
       INPUT CHECK
    ------------------------------------------------------ */

    function shouldIgnore(event) {

        const element = event.target;

        if (!element) {

            return false;

        }

        return element.matches(

            "input, textarea, select"

        );

    }

    /* ------------------------------------------------------
       PUBLIC API
    ------------------------------------------------------ */

    return {

        init

    };

})();