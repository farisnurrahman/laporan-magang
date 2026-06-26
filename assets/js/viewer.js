"use strict";

/* ==========================================================
   ACADEMIC DOCUMENT VIEWER
   Static Viewer v3.0
========================================================== */

const Viewer = (() => {

    /* ======================================================
       ELEMENTS
    ====================================================== */

    let iframe = null;
    let loading = null;
    let error = null;
    let status = null;

    /* ======================================================
       CONFIGURATION
    ====================================================== */

    const PDF_FILE = "laporan_magang_preview.pdf";

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function init() {

        iframe = document.getElementById("js-pdf-viewer");
        loading = document.getElementById("js-loading");
        error = document.getElementById("js-error");
        status = document.getElementById("js-document-status");

        if (!iframe) {

            console.error("Viewer iframe not found.");

            return;

        }

        bindEvents();

        open(PDF_FILE);

    }

    /* ======================================================
       EVENTS
    ====================================================== */

    function bindEvents() {

        iframe.addEventListener("load", handleLoad);

    }

    /* ======================================================
       OPEN DOCUMENT
    ====================================================== */

    function open(file) {

        showLoading();

        hideError();

        setStatus("Loading document...");

        iframe.src =
            file +
            "#toolbar=0&navpanes=0&scrollbar=0";

    }

    /* ======================================================
       LOAD SUCCESS
    ====================================================== */

    function handleLoad() {

        hideLoading();

        setStatus("Official Preview");

    }

    /* ======================================================
       LOADING
    ====================================================== */

    function showLoading() {

        if (!loading) return;

        loading.hidden = false;

        loading.style.display = "flex";

    }

    function hideLoading() {

        if (!loading) return;

        loading.hidden = true;

        loading.style.display = "none";

    }

    /* ======================================================
       ERROR
    ====================================================== */

    function showError(message = "Document unavailable") {

        if (!error) return;

        const title = error.querySelector("h2");

        if (title) {

            title.textContent = message;

        }

        error.hidden = false;

        error.style.display = "flex";

    }

    function hideError() {

        if (!error) return;

        error.hidden = true;

        error.style.display = "none";

    }

    /* ======================================================
       STATUS
    ====================================================== */

    function setStatus(text) {

        if (!status) return;

        status.textContent = text;

    }

    /* ======================================================
       RELOAD
    ====================================================== */

    function reload() {

        if (!iframe) return;

        iframe.src = iframe.src;

    }

    /* ======================================================
       PUBLIC
    ====================================================== */

    return {

        init,

        open,

        reload

    };

})();