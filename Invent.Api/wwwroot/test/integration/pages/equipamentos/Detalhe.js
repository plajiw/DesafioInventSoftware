sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/matchers/I18NText",
  "sap/ui/test/actions/Press",
  "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, I18NText, Press, PropertyStrictEquals) {
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
              name: "icon",
              value: "sap-icon://nav-back"
            }),
            actions: new Press(),
            success: function () {
              Opa5.assert.ok(true, "Pressionei o botão Voltar na tela de Detalhe");
            },
            errorMessage: "Não encontrei o botão Voltar na tela de Detalhe"
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
              Opa5.assert.ok(true, "Página de Detalhe foi aberta corretamente");
            },
            errorMessage: "Página de Detalhe não abriu como esperado"
          });
        }
      }
    }
  });
});
