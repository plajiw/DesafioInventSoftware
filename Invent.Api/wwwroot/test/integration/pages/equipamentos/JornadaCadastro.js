sap.ui.define([
  "sap/ui/test/opaQunit",
  "./Cadastro",
  "./Lista",
  "./Detalhe"
], function (opaTest) {
  "use strict";

  QUnit.module("Fluxo de Cadastro de Equipamentos");

  opaTest("Fluxo de cadastro completo", function (Given, When, Then) {
    Given.iStartMyApp({ hash: "/cadastro" });

    // Verifica abertura da página de cadastro
    Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();

    // Voltar sem salvar, retorna à lista
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmVoltar();
    Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

    // Voltar para cadastro
    When.naPaginaDeListagemDeEquipamentos.euClicoNoBotaoDeCadastro();
    Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();

    // Tentar salvar vazio, erros obrigatórios
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();
    
    // Dados obrigatorios em branco
    When.naPaginaDeCadastroDeEquipamentos.preenchoONome("");
    When.naPaginaDeCadastroDeEquipamentos.preenchoOTipo("");
    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("")
    Then.naPaginaDeCadastroDeEquipamentos.nomeComErroDeValidacao();
    Then.naPaginaDeCadastroDeEquipamentos.tipoComErroDeValidacao();
    Then.naPaginaDeCadastroDeEquipamentos.quantidadeComErroDeValidacao();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();
    
    // Preenche o nome
    When.naPaginaDeCadastroDeEquipamentos.preenchoONome("Teste 2");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    // Preenche o tipo
    When.naPaginaDeCadastroDeEquipamentos.preenchoOTipo("Manual");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    // Preenche a quantidade, incorretamente
    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("-1");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    // Preenche a quantidade, incorretamente mais uma vez
    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("99999");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmFecharValidacaoErro();

    // Preenche a quantidade
    When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("10");
    When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();

    Then.iTeardownMyApp();
  });

});
