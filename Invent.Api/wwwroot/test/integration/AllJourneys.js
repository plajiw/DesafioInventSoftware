sap.ui.define([
    "sap/ui/test/Opa5",
    "ui5/gestaoequipamento/test/integration/arrangements/Startup",
    "ui5/gestaoequipamento/test/integration/pages/equipamentos/JornadaLista",
    "ui5/gestaoequipamento/test/integration/journeys/EquipamentoListaJourney"
], (Opa5, Startup) => {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "ui5.gestaoequipamento.view.",
        autoWait: true
    });
});

// Define configurações globais do OPA5, como o namespace das views e o objeto Startup para inicialização
