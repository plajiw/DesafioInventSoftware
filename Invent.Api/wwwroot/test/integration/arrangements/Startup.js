sap.ui.define([
	"sap/ui/test/Opa5"
], (Opa5) => {
	"use strict";

	return Opa5.extend("ui5.gestaoequipamento.test.integration.arrangements.Startup", {
		// Inicia a aplicação para os testes
		iStartMyApp: function (oOptions) {
			const options = oOptions || {};
			return this.iStartMyUIComponent({
				componentConfig: {
					name: "ui5.gestaoequipamento",
					async: true
				},
				hash: options.hash || "",
				autoWait: oOptions.autoWait
			});
		},

		// Finaliza a aplicação após os testes
		iTearDownMyApp: function () {
			return this.iTeardownMyUIComponent();
		}
	});
});