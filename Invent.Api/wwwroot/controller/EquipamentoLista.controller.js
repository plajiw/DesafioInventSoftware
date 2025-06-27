sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.EquipamentoLista", {

        onInit() {
        
            fetch("https://localhost:7178/api/EquipamentosControlador")
                .then(r => r.json())
                .then(data => this.getView().setModel(new JSONModel(data), "equipamentos"  ))
                .then(() => this.getView().getModel("equipamentos").getData());

        }
    });
});
