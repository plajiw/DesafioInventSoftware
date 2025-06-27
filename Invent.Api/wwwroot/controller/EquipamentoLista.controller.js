sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "../model/formatter"
], (Controller, JSONModel, Filter, FilterOperator, formatter) => {
  "use strict";


  // Constantes
  const MODEL_NAME = "equipamentos";
  const API_BASE_URL = "https://localhost:7178/api";
  const ENDPOINT_EQUIPAMENTOS = "EquipamentosControlador";

  return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoLista", {
    formatter: formatter,

    onInit: function () {
      
      // Criamos o modelo vazio e já o associa à View
      const oModel = new JSONModel([]);
      this.getView().setModel(oModel, MODEL_NAME);

      // Monta a URL via template literal e carrega dados
      const sUrl = `${API_BASE_URL}/${ENDPOINT_EQUIPAMENTOS}`;
      fetch(sUrl)
        .then(res  => res.json())
        .then(data => this.getView().getModel(MODEL_NAME).setData(data))
        .catch(err  => console.error("Erro ao carregar equipamentos:", err));
    },

    onSearch: function (oEvent) {
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
