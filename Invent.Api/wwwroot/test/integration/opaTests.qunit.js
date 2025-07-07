/* global QUnit */
sap.ui.define([
    "sap/ui/test/Opa5",
    "ui5/gestaoequipamento/test/integration/AllJourneys"
], () => {
    "use strict";

    QUnit.config.autostart = false;

    sap.ui.getCore().attachInit(() => {
        QUnit.start();
    });
});