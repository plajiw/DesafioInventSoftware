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
      // Criamos um modelo JSON vazio
      var oModel = new JSONModel([]);

      // Vincula o modelo à View associada
      this.getView().setModel(oModel, NOME_MODELO_EQUIPAMENTOS);

      // Obter o roteador
      const roteador = UIComponent.getRouterFor(this);
      // Listener para capturar a rota e lançar a função _carregarEquipamentos
      roteador.getRoute(ROTA_PARA_LISTA).attachPatternMatched(this._carregarEquipamentos, this);
    },

    _carregarEquipamentos() {
      // Obtém o modelo
      const oModelo = this.getView().getModel(NOME_MODELO_EQUIPAMENTOS);

      fetch(ENDPOINT_EQUIPAMENTOS)
        .then(res => res.json())
        .then(data => oModelo.setData(data))
        .catch(err => console.error(err));
    },
    // Função de busca
    aoBuscar: function (oEvent) {
      const sQuery = oEvent.getParameter("query");
      const oBinding = this.byId(ID_TABELA_EQUIPAMENTOS).getBinding("items");

      // Monta o array de filtros
      const aFilters = [];
      if (sQuery) {
        const oFilter = new Filter(PROPRIEDADE_FILTRO_NOME, FilterOperator.Contains, sQuery);
        aFilters.push(oFilter);
      }

      // Aplica o filtro
      oBinding.filter(aFilters);
    },

    // Função para trocar página
    paraCadastro: function () {
      this.getOwnerComponent().getRouter().navTo("cadastroEquipamento", {}, true);
    },

    // Função para acessar os detalhes do equipamento
    aoPressionarItem: function (oEvento) {
      // Obtem o item da lista que foi pressionado
      const oItemPressionado = oEvento.getSource();

      // Obtem o contexto do binding
      const oContexto = oItemPressionado.getBindingContext(NOME_MODELO_EQUIPAMENTOS);

      // A partir do contexto, extrai a propriedade "id" do equipamento
      const idDoEquipamento = oContexto.getProperty(PROPRIEDADE_ID);
      const oRoteador = this.getOwnerComponent().getRouter();

      // Navegar para a rota, passando o ID como parâmetro
      oRoteador.navTo(ROTA_PARA_DETALHES, { id: idDoEquipamento });
    }
  });
});