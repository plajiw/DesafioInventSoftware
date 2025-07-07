sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/model/odata/v2/ODataModel"
], function(Opa5, ODataModel) {
	"use strict";

	return Opa5.extend("ui5.gestaoequipamento.test.integration.arrangements.Startup", {
		iStartMyApp : function (oOptionsParameter) {
			var oOptions = oOptionsParameter || {};
			this._clearSharedData();

			oOptions.delay = oOptions.delay || 1;

			var aMockData = [
				{ id: "EquipamentoEletronicos-1-A", nome: "Teste 1", tipo: "Eletrônico", quantidadeEmEstoque: 10, dataDeInclusao : "2025-07-04T14:31:53.9636692Z", temEstoque : true },
				{ id: "EquipamentoEletronicos-2-A", nome: "Teste 2", tipo: "Eletrônico", quantidadeEmEstoque: 100, dataDeInclusao : "2025-07-04T14:31:53.9636692Z", temEstoque: true }
			];

			window.fetch = function()
			{
				return Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(aMockData);
					}
				});
			};

			this.iStartMyUIComponent({
				componentConfig: {
					name: "ui5.gestaoequipamento",
					async: true
				},
				hash: oOptions.hash,
				autoWait: oOptions.autoWait
			});
		},

		_clearSharedData: function () {
			ODataModel.mSharedData = { server: {}, service: {}, meta: {} };
		}
	});
});
