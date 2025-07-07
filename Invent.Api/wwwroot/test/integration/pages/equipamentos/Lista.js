sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
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
                        i18NText: {
                            propertyName: "title",
                            key: "tituloPaginaLista"
                        },
                        success: function () {
                            Opa5.assert.ok(true, "Página de lista foi aberta com o título correto");
                        }
                    });
                },

                tabelaCarregadaComDados: function () {
                    return this.waitFor({
                        id: "tabelaEquipamentos",
                        viewName: VIEW_NAME,
                        controlType: "sap.m.Table",
                        success: function (oTable) {
                            var iItems = oTable.getItems().length;
                            Opa5.assert.ok(iItems > 0, "Tabela carregou com pelo menos um item");
                        }
                    });
                }
            }
        }
    });
});
