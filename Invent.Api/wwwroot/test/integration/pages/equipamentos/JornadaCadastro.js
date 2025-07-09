sap.ui.define([
  "sap/ui/test/opaQunit",
  "./Cadastro",
  "./Lista",
  "./Detalhe"
], function (opaTest) {
  "use strict";

  QUnit.module("Fluxo Cadastro de Equipamento");

  opaTest("Fluxo de cadastro completo", function (Given, When, Then) {
    Given.iStartMyApp({ hash: "/cadastro" });

    Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();

    When.naPaginaDeCadastroDeEquipamentos.euClicoEmVoltar();
    Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

    When.naPaginaDeListagemDeEquipamentos.euClicoNoBotaoDeCadastro();
    Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();

    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();
    
    When.naPaginaDeCadastroDeEquipamentos.preenchoONome("");
    When.naPaginaDeCadastroDeEquipamentos.preenchoOTipo("");
    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("")
    Then.naPaginaDeCadastroDeEquipamentos.nomeComErroDeValidacao();
    Then.naPaginaDeCadastroDeEquipamentos.tipoComErroDeValidacao();
    Then.naPaginaDeCadastroDeEquipamentos.quantidadeComErroDeValidacao();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();
    
    When.naPaginaDeCadastroDeEquipamentos.preenchoONome("Teste 2");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    When.naPaginaDeCadastroDeEquipamentos.preenchoOTipo("Manual");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("-1");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("99999");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("10");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();

    Then.iTeardownMyApp();
  });

});
