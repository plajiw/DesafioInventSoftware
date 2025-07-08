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

		// Carregar a tela de listagem
		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();
		Then.naPaginaDeListagemDeEquipamentos.tabelaCarregadaComDados();

		// Buscar item existente
		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("Teste 1");
		Then.naPaginaDeListagemDeEquipamentos.tabelaContemItem("Teste 1");

		// Navegar para detalhe e voltar
		When.naPaginaDeListagemDeEquipamentos.euClicoNoItemPeloNome("Teste 1");
		Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();
		When.naPaginaDeDetalheDeEquipamento.euClicoEmVoltar();
		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

		// Buscar item inexistente
		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("Não existe");
		Then.naPaginaDeListagemDeEquipamentos.tabelaVazia();

		// Reexibir todos os dados limpando filtro
		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("");
		Then.naPaginaDeListagemDeEquipamentos.tabelaCarregadaComDados();

		// Navegar para cadastro e voltar
		When.naPaginaDeListagemDeEquipamentos.euClicoNoBotaoDeCadastro();
		Then.naPaginaDeCadastroDeEquipamentos.paginaDeCadastroAberta();
		When.naPaginaDeCadastroDeEquipamentos.euClicoEmVoltar();
		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();

		Then.iTeardownMyApp();
	});
});
