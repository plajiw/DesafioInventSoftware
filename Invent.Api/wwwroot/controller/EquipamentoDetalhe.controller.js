sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

      const ROTA_PARA_LISTA = "listaEquipamento";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {
        
        // Retornar página
        aoClicarEmVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(ROTA_PARA_LISTA);
        },

        // Salvar
        aoClicarEmEditar: function ()
        {
            
        }

    });
});