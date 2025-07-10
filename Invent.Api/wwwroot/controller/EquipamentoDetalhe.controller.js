sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/library",
    "sap/m/Button",
    "sap/m/Text",
], (Controller, JSONModel, formatter, UIComponent, MessageToast, Dialog, santaLibrary, mobileLibrary, Button, Text) => {
    "use strict";

    const CHAVE_I18N_TITULO_REMOCAO = "tituloConfirmarRemocao";
    const CHAVE_I18N_VALIDAR_REMOCAO = "confirmarRemover";
    const CHAVE_I18N_SUCESSO_REMOCAO = "equipamentoRemovido";
    const CHAVE_I18N_BOTAO_REMOVER = "botaoConfirmar";
    const CHAVE_I18N_BOTAO_CANCELAR = "botaoCancelar";

    const MODELO_EQUIPAMENTO = "equipamentos";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_EDITAR = "editarEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamento";
    const ARGUMENTOS_DA_ROTA = "arguments";
    const PROPRIEDADE_ID = "/id";
    const PROPRIEDADE_NOME = "/nome";

    return Controller.extend("ui.model.gestaoequipamento.controller.EquipamentoDetalhe", {
        formatter: formatter,

        onInit: function () {
            this._view = this.getView();
            this._roteador = UIComponent.getRouterFor(this);
            const oModelo = new JSONModel();
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
            const oModelo = this._obterModeloEquipamento();
            const idDoEquipamento = oModelo.getProperty(PROPRIEDADE_ID);
            this._roteador.navTo(ROTA_EDITAR, { id: idDoEquipamento });
        },

        aoClicarRemover: function () {
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
            let DialogType = mobileLibrary.DialogType;
            let ButtonType = mobileLibrary.ButtonType;
            let oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            let oModelo = this._obterModeloEquipamento();
            let nome = oModelo.getProperty(PROPRIEDADE_NOME);

            if (!this.dialogAprovarRemocao) {
                this._textoDialogo = new Text({ text: "" });
                this.dialogAprovarRemocao = new Dialog({
                    type: DialogType.Message,
                    title: oResourceBundle.getText(CHAVE_I18N_TITULO_REMOCAO),
                    content: this._textoDialogo,
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: oResourceBundle.getText(CHAVE_I18N_BOTAO_REMOVER),
                        press: () => {
                            const id = oModelo.getProperty(PROPRIEDADE_ID);
                            MessageToast.show(oResourceBundle.getText(CHAVE_I18N_SUCESSO_REMOCAO));
                            this._removerEquipamento(id);
                            this.dialogAprovarRemocao.close();
                        }
                    }),
                    endButton: new Button({
                        text: oResourceBundle.getText(CHAVE_I18N_BOTAO_CANCELAR),
                        press: () => {
                            this.dialogAprovarRemocao.close();
                        }
                    })
                });

                this.getView().addDependent(this.dialogAprovarRemocao);
            }

            this._textoDialogo.setText(oResourceBundle.getText(CHAVE_I18N_VALIDAR_REMOCAO, [nome]));
            this.dialogAprovarRemocao.open();
        },

        _aoCoincidirRota: function (oEvento) {
            const id = oEvento.getParameter(ARGUMENTOS_DA_ROTA).id;
            this._buscarDadosEquipamento(id);
        },

        _buscarDadosEquipamento(id) {
            const oModelo = this._obterModeloEquipamento();
            const urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;

            fetch(urlApi)
                .then(res => res.json())
                .then(dados => oModelo.setData(dados))
        }
    });
});