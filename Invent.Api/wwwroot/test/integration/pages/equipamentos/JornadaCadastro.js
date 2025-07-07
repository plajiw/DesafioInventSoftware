sap.ui.define([
    "sap/ui/test/opaQunit",
    "./Lista",
    "./Cadastro"
], function (opaTest) {
    "use strict";

    QUnit.module("Fluxo de Cadastro de Equipamento");

    opaTest("Ao clicar em Cadastrar a página de cadastro é aberta", function (Given, When, Then) {
        Given.iStartMyApp();

        When.naPaginaDeListagemDeEquipamentos.euClicoNoBotaoDeCadastro();

        Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();
        When.naPaginaDeCadastroDeEquipamentos.preenchoONome("Nome do Equipamento");
        When.naPaginaDeCadastroDeEquipamentos.preenchoOTipo("Tipo do Equipamento");
        When.naPaginaDeCadastroDeEquipamentos.preenchoAQuantidade("10");
        When.naPaginaDeCadastroDeEquipamentos.euClicoEmSalvar();
        
        Then.iTeardownMyApp();
    });

});