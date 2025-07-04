sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/UIComponent"
], (Controller, JSONModel, formatter, UIComponent) => {
    "use strict";

    // Constantes
    const MODELO_DETALHES = "detalhes";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_EDITAR = "editarEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
    const ARGUMENTOS_DA_ROTA = "arguments";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {
        formatter: formatter,

        onInit: function () {
            let oModelo = new JSONModel();
            this.getView().setModel(oModelo, MODELO_DETALHES);
            this._roteador = UIComponent.getRouterFor(this);
            this._roteador.getRoute(ROTA_DETALHES).attachPatternMatched(this._aoCoincidirRota, this);
        },

        aoClicarEmVoltar: function () {
            this._roteador.navTo(ROTA_LISTA, {}, true);
        },

        aoClicarEmEditar: function () {
            const caminhoIdEquipamento = "/id";
            let oModelo = this.getView().getModel(MODELO_DETALHES);
            let idDoEquipamento = oModelo.getProperty(caminhoIdEquipamento);
            this._roteador.navTo(ROTA_EDITAR, { id: idDoEquipamento }, true);
        },

        aoClicarEmRemover: function () {
        },

        _aoCoincidirRota: function (oEvento) {
            let id = oEvento.getParameter(ARGUMENTOS_DA_ROTA).id;
            this._buscarDadosEquipamento(id);
        },

        _buscarDadosEquipamento(id) {
            let oModeloDetalhes = this.getView().getModel(MODELO_DETALHES);
            let urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;

            fetch(urlApi)
                .then(res => res.json())
                .then(dados => oModeloDetalhes.setData(dados))
                .catch(err => console.error("Erro ao buscar detalhes do equipamento:", err));
        }
    });
});