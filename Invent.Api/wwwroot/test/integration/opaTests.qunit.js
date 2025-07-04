sap.ui.define([
    "sap/ui/test/Opa5",
    "ui5/gestaoequipamento/test/integration/journeys/ListaJourney"
], (Opa5) => {
    "use strict";

    Opa5.extendConfig({
        viewNamespace: "ui5.gestaoequipamento.view.",
        autoWait: true,
        timeout: 15
    });

    QUnit.config.autostart = false;

    sap.ui.getCore().attachInit(() => {
        QUnit.start();
    });
});