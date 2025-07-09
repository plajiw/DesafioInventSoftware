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
                        actions: new Press()
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
                        actions: new Press()
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
                        actions: new Press()
                    });
                },
                euConfirmoRemocao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: "Sim"
                        }),
                        actions: new Press()
                    });
                },
                euNaoConfirmoRemocao: function () {
                    const INDICE_BOTAO_NAO = 1;
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true, // Limita a busca aos controles dentro do diálogo aberto
                        success: function (aButtons) { // [Botão 0: ID=__mbox-btn-0, Texto=Sim, Botão 1: ID=__mbox-btn-1, Texto=Não"]
                            aButtons[INDICE_BOTAO_NAO].firePress();
                            Opa5.assert.ok(true, "Botão 'Não' clicado no diálogo.");
                        },
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
                        })
                    });
                }
            }
        }
    });
});