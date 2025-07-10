sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
], (Controller, JSONModel, Filter, FilterOperator, formatter, UIComponent, MessageBox) => {
    "use strict";

    const MODELO_EQUIPAMENTO = "equipamentos";
    const PROPRIEDADE_NOME = "nome";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
    const ID_TABELA_EQUIPAMENTOS = "tabelaEquipamentos";
    const PROPRIEDADE_ID = "id";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_CADASTRO = "cadastroEquipamento";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoLista", {
        formatter: formatter,

        onInit: function () {
            let oModelo = new JSONModel([]);
            this.getView().setModel(oModelo, MODELO_EQUIPAMENTO);

            this.roteador = UIComponent.getRouterFor(this);
            this.roteador.getRoute(ROTA_LISTA).attachPatternMatched(this._carregarEquipamentos, this);
        },

        _obterModeloEquipamento: function () {
            return this.getView().getModel(MODELO_EQUIPAMENTO);
        },

        _carregarEquipamentos() {
            let oModelo = this._obterModeloEquipamento();
            fetch(ENDPOINT_EQUIPAMENTOS)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Erro HTTP: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        throw new Error("API não retornou uma lista de equipamentos");
                    }
                    oModelo.setData(data);
                })
                .catch(err => {
                    MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("erroCarregarEquipamentos"));
                });
        },

        aoBuscar: function (oEvent) {
            const consultaRealizada = "query";
            const conjutoDeEquipamentos = "items";

            const sQuery = oEvent.getParameter(consultaRealizada);
            const oBinding = this.byId(ID_TABELA_EQUIPAMENTOS).getBinding(conjutoDeEquipamentos);

            const aFilters = [];
            if (sQuery) {
                const oFilter = new Filter(PROPRIEDADE_NOME, FilterOperator.Contains, sQuery);
                aFilters.push(oFilter);
            }

            oBinding.filter(aFilters);
        },

        aoClicarEmCadastrar: function () {
            this.roteador.navTo(ROTA_CADASTRO, {}, true);
        },

        aoPressionarItem: function (oEvento) {
            const oItemPressionado = oEvento.getSource();
            const oContexto = oItemPressionado.getBindingContext(MODELO_EQUIPAMENTO);
            const idDoEquipamento = oContexto.getProperty(PROPRIEDADE_ID);
            this.roteador.navTo(ROTA_DETALHES, { id: idDoEquipamento });
        }
    });
});