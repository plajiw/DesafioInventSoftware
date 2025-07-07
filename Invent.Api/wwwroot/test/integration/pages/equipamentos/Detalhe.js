// webapp/test/integration/pages/Detalhe.js
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
              Opa5.assert.ok(true, "Cliquei em Voltar na tela de Detalhe");
            },
            errorMessage: "Não encontrei o botão Voltar na tela de Detalhe."
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
              Opa5.assert.ok(true, "Tela de Detalhe aberta com o título correto");
            },
            errorMessage: "Tela de Detalhe não abriu como esperado."
          });
        }
      }

    }
  });
});
