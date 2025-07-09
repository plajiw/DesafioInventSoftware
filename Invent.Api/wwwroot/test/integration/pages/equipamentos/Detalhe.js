sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/actions/Press"
], function (Opa5, I18NText, PropertyStrictEquals, Press) {
    "use strict";

    const VIEW_NAME = "EquipamentoDetalhe";

    Opa5.createPageObjects({
        naPaginaDeDetalheDeEquipamento: {
            actions: {
                euClicoEmVoltar: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "type",
                            value: "Back"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão 'Voltar' clicado com sucesso.");
                        },
                        errorMessage: "Não encontrei o botão 'Voltar'."
                    });
                },
                euClicoEmRemover: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoRemover"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão 'Remover' clicado com sucesso.");
                        },
                        errorMessage: "Não encontrei o botão 'Remover'."
                    });
                },
                euClicoEmEditar: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoEditar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão 'Editar' clicado com sucesso.");
                        },
                        errorMessage: "Não encontrei o botão 'Editar'."

                    });
                },
                euConfirmoRemocao: function () {
                    const INDICE_BOTAO_SIM = 0;
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true, // Limita a busca aos controles dentro do diálogo aberto
                        success: function (arrayDeBotoes) { // [Botão 0: ID=__mbox-btn-0, Texto=Sim, Botão 1: ID=__mbox-btn-1, Texto=Não"]
                            arrayDeBotoes[INDICE_BOTAO_SIM].firePress();
                            Opa5.assert.ok(true, "Botão 'Sim' clicado com sucesso.");
                        },
                        errorMessage: "Não encontrei o botão 'Sim' na dentro do dialog."
                    });
                },
                euNaoConfirmoRemocao: function () {
                    const INDICE_BOTAO_NAO = 1;
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true, // Limita a busca aos controles dentro do diálogo aberto
                        success: function (arrayDeBotoes) { // [Botão 0: ID=__mbox-btn-0, Texto=Sim, Botão 1: ID=__mbox-btn-1, Texto=Não"]
                            console.log("Obtemos o array do botão: ",arrayDeBotoes)
                            arrayDeBotoes[INDICE_BOTAO_NAO].firePress();
                            Opa5.assert.ok(true, "Botão 'Não' clicado com sucesso");
                        },
                        errorMessage: "Não encontrei o botão 'Não' na dentro do dialog."
                    });
                }
            },
            assertions: {
                paginaDeDetalheAberta: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "title",
                            key: "tituloPaginaDetalhes"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Página de detalhes foi aberta corretamente.");
                        },
                        errorMessage: "Página de detalhes não abriu corretamente."
                    });
                }
            }
        }
    });
});