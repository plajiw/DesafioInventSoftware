sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    const ROTA_PARA_LISTA = "listaEquipamento";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {

        // Função de inicialização
        onInit: function () {
            
        },

        // Retornar página
        aoClicarEmVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(ROTA_PARA_LISTA);
        },

        // Salvar
        aoClicarEmSalvar: function () {

        }

    });
});