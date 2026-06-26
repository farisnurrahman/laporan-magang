"use strict";

/* ==========================================================
   APPLICATION BOOTSTRAP
========================================================== */

const App = (() => {

    let initialized = false;

    /* ------------------------------------------------------
       INITIALIZE
    ------------------------------------------------------ */

    function init() {

        if (initialized) {
            return;
        }

        initialized = true;

        initializeModules();

        bindGlobalEvents();

        console.info(
            "%cAcademic Document Viewer Suite",
            "color:#00adb5;font-weight:bold;"
        );

        console.info(
            "Application initialized successfully."
        );

    }

    /* ------------------------------------------------------
       MODULE INITIALIZATION
    ------------------------------------------------------ */

    function initializeModules() {

        if (typeof Viewer !== "undefined") {
            Viewer.init();
        }

        if (typeof Reading !== "undefined") {
            Reading.init();
        }

        if (typeof Fullscreen !== "undefined") {
            Fullscreen.init();
        }

        if (typeof Security !== "undefined") {
            Security.init();
        }

    }

    /* ------------------------------------------------------
       GLOBAL EVENTS
    ------------------------------------------------------ */

    function bindGlobalEvents() {

        window.addEventListener(

            "resize",

            debounce(handleResize, 150)

        );

        window.addEventListener(

            "focus",

            handleFocus

        );

        window.addEventListener(

            "blur",

            handleBlur

        );

        window.addEventListener(

            "beforeunload",

            handleBeforeUnload

        );

    }

    /* ------------------------------------------------------
       WINDOW EVENTS
    ------------------------------------------------------ */

    function handleResize() {

        console.debug(

            "Viewport:",

            window.innerWidth,

            "x",

            window.innerHeight

        );

    }

    function handleFocus() {

        document.body.classList.remove("is-inactive");

    }

    function handleBlur() {

        document.body.classList.add("is-inactive");

    }

    function handleBeforeUnload() {

        console.info(

            "Closing Academic Document Viewer..."

        );

    }

    /* ------------------------------------------------------
       DEBOUNCE
    ------------------------------------------------------ */

    function debounce(callback, delay) {

        let timer = null;

        return function (...args) {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback.apply(this, args);

            }, delay);

        };

    }

    /* ------------------------------------------------------
       PUBLIC API
    ------------------------------------------------------ */

    return {

        init

    };

})();

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
