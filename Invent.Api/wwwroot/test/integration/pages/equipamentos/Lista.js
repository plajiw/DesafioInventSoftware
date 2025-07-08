sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/matchers/BindingPath",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, AggregationLengthEquals, I18NText, BindingPath, Press, EnterText, PropertyStrictEquals) {
    "use strict";

    const VIEW_NAME = "EquipamentoLista";
    const QUANTIDADE_INICIAL = 2;
    const MODELO_EQUIPAMENTOS = "equipamentos";
    const QUANTIDADE_MINIMA_ESPERADA = 1;

    Opa5.createPageObjects({
        naPaginaDeListagemDeEquipamentos: {
            actions: {
                // Ação: Clicar no botão de cadastro
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
                },

                // Ação: Realizar busca pelo nome
                euBuscoPorNome: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.SearchField",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "buscarPlaceholder"
                        }),
                        actions: new EnterText({ text: nome }),
                        success: function () {
                            Opa5.assert.ok(true, `Busca realizada com: ${nome}.`);
                        },
                        errorMessage: "Campo de busca não encontrado."
                    });
                },

                // Ação: Clicar no item pelo nome
                euClicoNoItemPeloNome: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Text",
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: nome
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, `Item com o nome ${nome} clicado.`);
                        },
                        errorMessage: `Item com o nome ${nome} não foi encontrado na tela.`
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
                            Opa5.assert.ok(true, "Página de lista aberta.");
                        },
                        errorMessage: "Página de lista não abriu."
                    });
                },

                tabelaCarregadaComDados: function () {
                    return this.waitFor({
                        controlType: "sap.m.Table",
                        viewName: VIEW_NAME,
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: QUANTIDADE_INICIAL
                        }),
                        success: function () {
                            Opa5.assert.ok(true, `Tabela contém ${QUANTIDADE_INICIAL} itens.`);
                        },
                        errorMessage: "Quantidade de itens incorreta."
                    });
                },

                tabelaContemItem: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Text",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: nome
                        }),
                        success: function () {
                            Opa5.assert.ok(true, `Encontrado item "${nome}".`);
                        },
                        errorMessage: `Item "${nome}" não apareceu na tabela.`
                    });
                },
                tabelaVazia: function () {
                    return this.waitFor({
                        controlType: "sap.m.Table",
                        viewName: VIEW_NAME,
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: 0
                        }),
                        success: () => Opa5.assert.ok(true, "Tabela vazia"),
                        errorMessage: "Tabela não está vazia"
                    });
                }
            }
        }
    });
});
