sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, AggregationLengthEquals, I18NText, Press, PropertyStrictEquals) {
    "use strict";

    const VIEW_NAME = "EquipamentoLista";
    const QUANTIDADE_DE_EQUIPAMENTOS_ESPERADA = 2;

    Opa5.createPageObjects({
        naPaginaDeListagemDeEquipamentos: {
            actions: {
                euClicoNoBotaoDeCadastro: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoCadastrar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Cadastrar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Cadastrar não foi encontrado na página de lista."
                    });
                }
            },

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
                    return this.waitFor({
                        controlType: "sap.m.Table",
                        viewName: VIEW_NAME,
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: QUANTIDADE_DE_EQUIPAMENTOS_ESPERADA
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Tabela contém exatamente " + QUANTIDADE_DE_EQUIPAMENTOS_ESPERADA + " itens");
                        },
                        errorMessage: "Erro: a tabela não contém " + QUANTIDADE_DE_EQUIPAMENTOS_ESPERADA + " itens."
                    });
                },
            }
        }
    });
});
