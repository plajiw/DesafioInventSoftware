sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/matchers/I18NText"
], function (Opa5, AggregationLengthEquals, I18NText) {
    "use strict";

    const VIEW_NAME = "EquipamentoLista";

    Opa5.createPageObjects({
        naPaginaDeListagemDeEquipamentos: {
            actions: {},
            assertions: {
                paginaDeListaAberta: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "title",
                            key: "tituloPaginaLista"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Página de lista foi carregada conforme esperado.");
                        },
                        errorMessage: "Erro ao carregar a página de lista."
                    });
                },

                tabelaCarregadaComDados: function () {
                    const quantidadeEsperadaDeEquipamentos = 2;
                    return this.waitFor({
                        viewName: VIEW_NAME,
                        controlType: "sap.m.Table",
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: quantidadeEsperadaDeEquipamentos
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Tabela contém exatamente " + quantidadeEsperadaDeEquipamentos + "itens");
                        },
                        errorMessage: "Erro: a tabela não contém " + quantidadeEsperadaDeEquipamentos + " itens."
                    });
                }
            }
        }
    });
});
