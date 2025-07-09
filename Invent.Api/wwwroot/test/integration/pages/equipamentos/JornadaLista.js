sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Cadastro"
], function (opaTest) {
	"use strict";

	QUnit.module("Tela Listagem de Equipamento");

	opaTest("Fluxo de listagem completo", function (Given, When, Then) {
		Given.iStartMyApp();

		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();
		Then.naPaginaDeListagemDeEquipamentos.tabelaCarregadaComDados();

		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("Teste 1");
		Then.naPaginaDeListagemDeEquipamentos.tabelaContemItem("Teste 1");

		When.naPaginaDeListagemDeEquipamentos.euClicoNoItemPeloNome("Teste 1");
		Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();
		When.naPaginaDeDetalheDeEquipamento.euClicoEmVoltar();
		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("Não existe");
		Then.naPaginaDeListagemDeEquipamentos.tabelaVazia();

		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("");
		Then.naPaginaDeListagemDeEquipamentos.tabelaCarregadaComDados();

		When.naPaginaDeListagemDeEquipamentos.euClicoNoBotaoDeCadastro();
		Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();
		When.naPaginaDeCadastroDeEquipamentos.euClicoEmVoltar();
		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

		Then.iTeardownMyApp();
	});
});
