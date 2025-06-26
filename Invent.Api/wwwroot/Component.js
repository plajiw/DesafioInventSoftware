sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], (UIComponent, JSONModel, Device) => {
	"use strict";

	return UIComponent.extend("ui5.walkthrough.Component", {
		metadata: { manifest: "json" },
		init() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(new JSONModel(Device), "device");
			this.getRouter && this.getRouter().initialize();
		},
		
		getContentDensityClass() {
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
	});
});
