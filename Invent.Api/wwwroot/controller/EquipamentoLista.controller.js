sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "../model/formatter"
], (Controller, JSONModel, Filter, FilterOperator, formatter) => {
  "use strict";

  // Constantes

  const NOME_MODELO_EQUIPAMENTOS = "equipamentos";
  const PROPRIEDADE_FILTRO_NOME = "nome";
  const URL_BASE_API = "https://localhost:7178/api";
  const NOME_CONTROLADOR_EQUIPAMENTOS = "EquipamentosControlador";
  const ENDPOINT_EQUIPAMENTOS = `${URL_BASE_API}/${NOME_CONTROLADOR_EQUIPAMENTOS}`;

  return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoLista", {
    formatter: formatter,

    onInit: function () {

      // Criamos um modelo JSON vazio
      var oModel = new JSONModel([]);

      // Vincula o modelo à View associada
      this.getView().setModel(oModel, NOME_MODELO_EQUIPAMENTOS);

      // Carrega dados do serviço e popula o modelo
      fetch(ENDPOINT_EQUIPAMENTOS)
        .then(res => res.json())
        .then(data => this.getView().getModel(NOME_MODELO_EQUIPAMENTOS).setData(data))
        .catch(err => console.error(err));

    },

    // Função de busca
    onSearch: function (oEvent) {
      const sQuery = oEvent.getParameter("query");
      const oBinding = this.byId("tabelaEquipamentos").getBinding("items");

      // Monta o array de filtros
      const aFilters = [];
      if (sQuery) {
        const oFilter = new Filter(PROPRIEDADE_FILTRO_NOME, FilterOperator.Contains, sQuery);
        aFilters.push(oFilter);
      }

      // Aplica o filtro
      oBinding.filter(aFilters);
    }

  });
});