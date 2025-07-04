QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "sap/ui/test/opaQunit"
    ], function () {
        QUnit.start();
    });
});