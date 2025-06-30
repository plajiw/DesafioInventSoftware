sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        
        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("listaEquipamento");
        }

    });
});