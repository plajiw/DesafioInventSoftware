sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "../model/formatter",
  "sap/ui/core/UIComponent"
], (Controller, JSONModel, Filter, FilterOperator, formatter, UIComponent) => {
  "use strict";

  // Constantes
  const NOME_MODELO_EQUIPAMENTOS = "equipamentos";
  const PROPRIEDADE_FILTRO_NOME = "nome";
  const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
  const ID_TABELA_EQUIPAMENTOS = "tabelaEquipamentos";
  const PROPRIEDADE_ID = "id";
  const ROTA_PARA_DETALHES = "detalheEquipamento";
  const ROTA_PARA_LISTA = "listaEquipamento";

  return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoLista", {
    formatter: formatter,

    onInit: function () {
      var oModel = new JSONModel([]);

      this.getView().setModel(oModel, NOME_MODELO_EQUIPAMENTOS);

      this.roteador = UIComponent.getRouterFor(this);
      this.roteador.getRoute(ROTA_PARA_LISTA).attachPatternMatched(this._carregarEquipamentos, this);
    },

    _carregarEquipamentos() {
      // Obtém o modelo
      const oModelo = this.getView().getModel(NOME_MODELO_EQUIPAMENTOS);

      fetch(ENDPOINT_EQUIPAMENTOS)
        .then(res => res.json())
        .then(data => oModelo.setData(data))
        .catch(err => console.error(err));
    },

    aoBuscar: function (oEvent) {
      const consultaRealizada = "query";
      const conjutoDeEquipamentos = "items";

      const sQuery = oEvent.getParameter(consultaRealizada);
      const oBinding = this.byId(ID_TABELA_EQUIPAMENTOS).getBinding(conjutoDeEquipamentos);

      const aFilters = [];
      if (sQuery) {
        const oFilter = new Filter(PROPRIEDADE_FILTRO_NOME, FilterOperator.Contains, sQuery);
        aFilters.push(oFilter);
      }

      oBinding.filter(aFilters);
    },

    aoClicarEmCadastrar: function () {
      const rotaDeCadastro = "cadastroEquipamento";
      this.roteador.navTo(rotaDeCadastro, {}, true);
    },

    aoPressionarItem: function (oEvento) {
      const oItemPressionado = oEvento.getSource();
      const oContexto = oItemPressionado.getBindingContext(NOME_MODELO_EQUIPAMENTOS);

      // A partir do contexto, extrai a propriedade "id" do equipamento
      const idDoEquipamento = oContexto.getProperty(PROPRIEDADE_ID);

      // Navegar para a rota, passando o ID como parâmetro
      this.roteador.navTo(ROTA_PARA_DETALHES, { id: idDoEquipamento });
    }
  });
});