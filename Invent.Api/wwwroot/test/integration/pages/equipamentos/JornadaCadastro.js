sap.ui.define([
  "sap/ui/test/opaQunit",
  "./Lista",
  "./Cadastro",
  "./Detalhe"
], function (opaTest) {
  "use strict";

  QUnit.module("Fluxo de Cadastro de Equipamento");

  opaTest("Preenche formulário, salva e vê item na lista", function (Given, When, Then) {
    Given.iStartMyApp();
    // When.naPaginaDeListagemDeEquipamentos.euClicoNoBotaoDeCadastro();
    // Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();

    // When.naPaginaDeCadastroDeEquipamentos.preenchoONome("Nome do Equipamento");
    // When.naPaginaDeCadastroDeEquipamentos.preenchoOTipo("Tipo do Equipamento");
    // When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("10");
    // When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();

    // Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

    // When.naPaginaDeDetalheDeEquipamento.euClicoEmVoltar();

    // Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

    Then.iTeardownMyApp();
  });
});
