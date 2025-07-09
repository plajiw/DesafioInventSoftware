sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/opaQunit",
    "ui5/gestaoequipamento/test/integration/arrangements/Startup",
    "ui5/gestaoequipamento/test/integration/pages/equipamentos/JornadaLista",
    "ui5/gestaoequipamento/test/integration/pages/equipamentos/JornadaCadastro",
    "ui5/gestaoequipamento/test/integration/pages/equipamentos/JornadaDetalhe"
], (Opa5, opaTest, Startup) => {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "ui5.gestaoequipamento.view.",
        autoWait: true
    });
});