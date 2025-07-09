sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Cadastro"
], function (opaTest) {
	"use strict";

	QUnit.module("Tela Detalhes do Equipamento");

	opaTest("Fluxo de detalhes completo", function (Given, When, Then) {
		Given.iStartMyApp({ hash: "/equipamento/Equipamento-1-A" });

        Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

        When.naPaginaDeDetalheDeEquipamento.euClicoEmVoltar();
        When.naPaginaDeListagemDeEquipamentos.euClicoNoItemPeloNome("Teste 1");
        Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

        When.naPaginaDeDetalheDeEquipamento.euClicoEmEditar();
        When.naPaginaDeCadastroDeEquipamentos.euClicoEmVoltar();
        Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

        When.naPaginaDeDetalheDeEquipamento.euClicoEmRemover();
        When.naPaginaDeDetalheDeEquipamento.euNaoConfirmoRemocao();

        When.naPaginaDeDetalheDeEquipamento.euClicoEmRemover();
        When.naPaginaDeDetalheDeEquipamento.euConfirmoRemocao();
        
		Then.iTeardownMyApp();
	});
});
