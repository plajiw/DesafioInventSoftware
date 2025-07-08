sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, JSONModel, formatter, UIComponent, MessageBox, MessageToast) => {
    "use strict";

    // I18N
    const CHAVE_I18N_TITULO_REMOCAO = "tituloConfirmarRemocao";
    const CHAVE_I18N_VALIDAR_REMOCAO = "confirmarRemocaoEquipamento";
    const CHAVE_I18N_SUCESSO_REMOCAO = "equipamentoRemovido";

    // Constantes
    const MODELO_EQUIPAMENTO = "equipamentos";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_EDITAR = "editarEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
    const ARGUMENTOS_DA_ROTA = "arguments";
    const PROPRIEDADE_ID = "/id";
    const PROPRIEDADE_NOME = "/nome";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {
        formatter: formatter,

        onInit: function () {
            this._view = this.getView();
            this._roteador = UIComponent.getRouterFor(this);

            let oModelo = new JSONModel();

            this._view.setModel(oModelo, MODELO_EQUIPAMENTO);
            this._roteador.getRoute(ROTA_DETALHES).attachPatternMatched(this._aoCoincidirRota, this);
        },

        _obterModeloEquipamento: function () {
            return this.getView().getModel(MODELO_EQUIPAMENTO);
        },

        aoClicarEmVoltar: function () {
            this._roteador.navTo(ROTA_LISTA, {}, true);
        },

        aoClicarEmEditar: function () {
            let oModelo = this._obterModeloEquipamento();
            let idDoEquipamento = oModelo.getProperty(PROPRIEDADE_ID);
            this._roteador.navTo(ROTA_EDITAR, { id: idDoEquipamento });
        },

        aoClicarEmRemover: function () {
            this._alertaAoRemover();
        },

        _removerEquipamento: function (id) {
            const urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;
            fetch(urlApi, {
                method: 'DELETE',
            })
                .then(() => this._roteador.navTo(ROTA_LISTA, {}, true));
        },

        _alertaAoRemover: function () {
            let oModelo = this._obterModeloEquipamento();
            let id = oModelo.getProperty(PROPRIEDADE_ID);
            let nome = oModelo.getProperty(PROPRIEDADE_NOME);

            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            MessageBox.warning(oResourceBundle.getText(CHAVE_I18N_VALIDAR_REMOCAO, [nome]), {
                title: oResourceBundle.getText(CHAVE_I18N_TITULO_REMOCAO),
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                initialFocus: MessageBox.Action.NO,
                emphasizedAction: MessageBox.Action.YES,

                onClose: (botaoSelecionado) => {
                    if (botaoSelecionado === MessageBox.Action.YES) {
                        MessageToast.show(oResourceBundle.getText(CHAVE_I18N_SUCESSO_REMOCAO));
                        this._removerEquipamento(id);
                    }
                }
            });
        },

        _aoCoincidirRota: function (oEvento) {
            let id = oEvento.getParameter(ARGUMENTOS_DA_ROTA).id;
            this._buscarDadosEquipamento(id);
        },

        _buscarDadosEquipamento(id) {
            let oModelo = this._obterModeloEquipamento();
            let urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;

            fetch(urlApi)
                .then(res => res.json())
                .then(dados => oModelo.setData(dados))
                .catch(err => console.error("Erro ao buscar detalhes do equipamento:", err));
        }
    });
});