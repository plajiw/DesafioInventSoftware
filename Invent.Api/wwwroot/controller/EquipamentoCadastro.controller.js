sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        
        onNavBack: function () {
            // Retornar página
            this.getOwnerComponent().getRouter().navTo("listaEquipamento");
        },

        onSalvar: function ()
        {
            
        }

    });
});