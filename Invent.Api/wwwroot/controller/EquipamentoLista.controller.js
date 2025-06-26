sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/format/DateFormat",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "ui5/walkthrough/model/formatter"
], (Controller, JSONModel, DateFormat, Filter, FilterOperator, formatter) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.EquipamentoLista", {
    formatter,  // disponibiliza no XML

     onInit () {
      // cria o modelo vazio e já o associa à View
      var oModel = new JSONModel([]);
      this.getView().setModel(oModel, "equipamentos");
      
      // carrega dados do serviço
      fetch("https://localhost:7178/api/EquipamentosControlador")
        .then(res => res.json())
        .then(data => this.getView().getModel("equipamentos").setData(data))
        .catch(err => console.error(err));
    },

    onSearch(oEvent) {
      const sQuery = oEvent.getParameter("query");
      const oBinding = this.byId("tabelaEquipamentos").getBinding("items");

      // Monta o array de filtros
      const aFilters = [];
      if (sQuery) {
        const oFilter = new Filter("nome", FilterOperator.Contains, sQuery);
        aFilters.push(oFilter);
      }

      // Aplica o filtro
      oBinding.filter(aFilters);
    }

  });
});
