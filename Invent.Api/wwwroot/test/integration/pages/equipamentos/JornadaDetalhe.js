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

        // // Verificar acesso na página de detalhes
        // Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

        // // Sair e retornar à página de Detalhes
        // When.naPaginaDeDetalheDeEquipamento.euClicoEmVoltar();
        // When.naPaginaDeListagemDeEquipamentos.euClicoNoItemPeloNome("Teste 1");
        // Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

        // // Acessar painel de editar e retornar
        // When.naPaginaDeDetalheDeEquipamento.euClicoEmEditar();
        // When.naPaginaDeCadastroDeEquipamentos.euClicoEmVoltar();
        // Then.naPaginaDeDetalheDeEquipamento.paginaDeDetalheAberta();

        // Não confirmar remoção do equipamento
        When.naPaginaDeDetalheDeEquipamento.euClicoEmRemover();
        When.naPaginaDeDetalheDeEquipamento.euNaoConfirmoRemocao();

        // Confirmar remoção do equipamento
        When.naPaginaDeDetalheDeEquipamento.euClicoEmRemover();
        When.naPaginaDeDetalheDeEquipamento.euConfirmoRemocao();
        
		Then.iTeardownMyApp();
	});
});
