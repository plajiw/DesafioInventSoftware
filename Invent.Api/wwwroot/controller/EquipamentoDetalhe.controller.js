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
    "sap/m/MessageBox"
], (Controller, JSONModel, formatter, UIComponent, MessageToast, Dialog, mobileLibrary, Button, Text, MessageBox) => {
    "use strict";

    const CHAVE_I18N_TITULO_REMOCAO = "tituloConfirmarRemocao";
    const CHAVE_I18N_VALIDAR_REMOCAO = "confirmarRemocaoEquipamento";
    const CHAVE_18N_ERRO_REMOCAO = "erroRemoverEquipamento";
    const CHAVE_I18N_SUCESSO_REMOCAO = "equipamentoRemovido";
    const CHAVE_I18N_BOTAO_REMOVER = "botaoConfirmar";
    const CHAVE_I18N_BOTAO_CANCELAR = "botaoCancelar";
    const CHAVE_I18N_ERRO_CARREGAR_EQUIPAMENTOS = "erroCarregarEquipamentos";
    const MODELO_I18N = "i18n";
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
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_I18N).getResourceBundle();
            this._roteador.getRoute(ROTA_DETALHES).attachPatternMatched(this._aoCoincidirRota, this);
            const oModelo = new JSONModel();
            this._view.setModel(oModelo, MODELO_EQUIPAMENTO);
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

        aoClicarEmRemover: function () {
            this._alertaAoRemover();
        },

        _removerEquipamento: function (id) {
            const urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;
            fetch(urlApi, {
                method: 'DELETE',
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Erro HTTP: ${res.status}`);
                    }
                    MessageToast.show(this._oResourceBundle.getText(CHAVE_I18N_SUCESSO_REMOCAO));
                    this._roteador.navTo(ROTA_LISTA, {}, true);
                })
                .catch(err => {
                    MessageBox.error(this._oResourceBundle.getText(CHAVE_18N_ERRO_REMOCAO));
                });
        },

        _alertaAoRemover: function () {
            const DialogType = mobileLibrary.DialogType;
            const ButtonType = mobileLibrary.ButtonType;
            const oModelo = this._obterModeloEquipamento();
            const nome = oModelo.getProperty(PROPRIEDADE_NOME);

            if (!this.dialogAprovarRemocao) {
                this._textoDialogo = new Text({ text: "" });
                this.dialogAprovarRemocao = new Dialog({
                    type: DialogType.Message,
                    title: this._oResourceBundle.getText(CHAVE_I18N_TITULO_REMOCAO),
                    content: this._textoDialogo,
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: this._oResourceBundle.getText(CHAVE_I18N_BOTAO_REMOVER),
                        press: () => {
                            const id = oModelo.getProperty(PROPRIEDADE_ID);
                            this._removerEquipamento(id);
                            this.dialogAprovarRemocao.close();
                        }
                    }),
                    endButton: new Button({
                        text: this._oResourceBundle.getText(CHAVE_I18N_BOTAO_CANCELAR),
                        press: () => {
                            this.dialogAprovarRemocao.close();
                        }
                    })
                });

                this.getView().addDependent(this.dialogAprovarRemocao);
            }

            this._textoDialogo.setText(this._oResourceBundle.getText(CHAVE_I18N_VALIDAR_REMOCAO, [nome]));
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
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Erro HTTP: ${res.status}`);
                    }
                    return res.json();
                })
                .then(dados => oModelo.setData(dados))
                .catch(err => {
                    MessageBox.error(this._oResourceBundle.getText(CHAVE_I18N_ERRO_CARREGAR_EQUIPAMENTOS));
                });
        }
    });
});