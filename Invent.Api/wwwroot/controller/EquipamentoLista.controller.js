sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
], (Controller, JSONModel, formatter, UIComponent, MessageBox) => {
    "use strict";

    const CHAVE_I18N_ERRO_CARREGAR_EQUIPAMENTOS = "erroCarregarEquipamentos";
    const CHAVE_I18N_ERRO_BUSCAR_EQUIPAMENTOS = "erroBuscarEquipamentos";
    const MODELO_I18N = "i18n";
    const MODELO_EQUIPAMENTO = "equipamentos";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
    const PROPRIEDADE_ID = "id";
    const PARAMETRO_DE_BUSCA = "query";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_CADASTRO = "cadastroEquipamento";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoLista", {
        formatter: formatter,

        onInit: function () {
            let oModelo = new JSONModel([]);
            this.getView().setModel(oModelo, MODELO_EQUIPAMENTO);
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_I18N).getResourceBundle();
            this.roteador = UIComponent.getRouterFor(this);
            this.roteador.getRoute(ROTA_LISTA).attachPatternMatched(this._carregarEquipamentos, this);
        },

        _obterModeloEquipamento: function () {
            return this.getView().getModel(MODELO_EQUIPAMENTO);
        },

        _carregarEquipamentos: function () {
            let oModelo = this._obterModeloEquipamento();
            this.getView().setBusy(true);
            fetch(ENDPOINT_EQUIPAMENTOS)
                .then(res => res.json())
                .then(data => oModelo.setData(data))
                .catch(() => {
                    MessageBox.error(this._oResourceBundle.getText(CHAVE_I18N_ERRO_CARREGAR_EQUIPAMENTOS));
                })
                .finally(() => this.getView().setBusy(false));
        },

        aoBuscar: function (oEvento) {
            const query = oEvento.getParameter(PARAMETRO_DE_BUSCA);
            const oModelo = this._obterModeloEquipamento();
            const url = `${ENDPOINT_EQUIPAMENTOS}?filtro=${query}`;

            this.getView().setBusy(true);

            fetch(url)
                .then(res => res.json())
                .then(data => oModelo.setData(data))
                .catch(() => {
                    MessageBox.error(this._oResourceBundle.getText(CHAVE_I18N_ERRO_BUSCAR_EQUIPAMENTOS));
                })
                .finally(() => this.getView().setBusy(false));
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