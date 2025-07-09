sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/m/MessageBox"
], function (Opa5, I18NText, EnterText, Press, PropertyStrictEquals, MessageBox) {
    "use strict";

    const VIEW_NAME = "EquipamentoCadastro";

    Opa5.createPageObjects({
        naPaginaDeCadastroDeEquipamentos: {
            actions: {

                euClicoEmVoltar: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        matchers: new PropertyStrictEquals({
                            name: "type",
                            value: "Back"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Cliquei em Voltar na tela de Cadastro");
                        },
                        errorMessage: "Não encontrei o botão Voltar na tela de Cadastro."
                    });
                },
                preenchoONome: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "placeholderNome"
                        }),
                        actions: new EnterText({ text: nome }),
                        success: function () {
                            Opa5.assert.ok(true, "Preenchi o nome com: " + nome);
                        },
                        errorMessage: "Não encontrei o campo Nome na página de cadastro."
                    });
                },
                preenchoOTipo: function (tipo) {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "placeholderTipo"
                        }),
                        actions: new EnterText({ text: tipo }),
                        success: function () {
                            Opa5.assert.ok(true, "Preenchi o tipo com: " + tipo);
                        },
                        errorMessage: "Não encontrei o campo Tipo na página de cadastro."
                    });
                },
                preenchoAQuantidade: function (quantidade) {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "placeholderQuantidade"
                        }),
                        matchers: new PropertyStrictEquals({
                            name: "type",
                            value: "Number",
                        }),
                        actions: new EnterText({ text: quantidade }),
                        success: function () {
                            Opa5.assert.ok(true, "Preenchi a quantidade com: " + quantidade);
                        },
                        errorMessage: "Não encontrei o campo Quantidade na página de cadastro."
                    });
                },
                euClicoEmSalvar: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoSalvar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Salvar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Salvar não foi encontrado na página de cadastro."
                    });
                },
                euClicoEmFecharValidacaoErro: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: "Fechar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Fechar da MessageBox clicado");
                        },
                        errorMessage: "Botão da MessageBox não encontrado."
                    });
                }

            },

            assertions: {
                paginaDeCadastroAberta: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "title",
                            key: "tituloPaginaCadastro"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Página de cadastro foi aberta corretamente.");
                        },
                        errorMessage: "Página de cadastro não abriu corretamente."
                    });
                },

                nomeComErroDeValidacao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Campo Nome está em Error state.");
                        },
                        errorMessage: "Campo Nome não apresentou erro."
                    });
                },
                tipoComErroDeValidacao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Campo Tipo está em Error state.");
                        },
                        errorMessage: "Campo Tipo não apresentou erro."
                    });
                },
                quantidadeComErroDeValidacao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Campo Quantidade está em Error state.");
                        },
                        errorMessage: "Campo Quantidade não apresentou erro."
                    });
                }
            }
        }
    });
});
