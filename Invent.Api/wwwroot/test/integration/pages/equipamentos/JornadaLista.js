sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista"
], function (opaTest) {
	"use strict";

	QUnit.module("TelaDeListagem", () => {

		opaTest("Tela de listagem deve ser carregada com sucesso", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			// Assertions
			Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();
            Then.naPaginaDeListagemDeEquipamentos.tabelaCarregadaComDados();

			// Cleanup
			Then.iTeardownMyApp(); // Esse método deve ser sempre chamado uma única vez na jornada inteira. 
			// Como nesse exemplo só existe um teste, então por esse motivo ele está logo no primeiro.
		});
	});

});