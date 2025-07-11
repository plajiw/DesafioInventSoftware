sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel"
], (UIComponent, ResourceModel) => {
    "use strict";

    const I18N_MODELO = "i18n";
    const CHAVE_TITULO_APP = "tituloAplicacao";

    return UIComponent.extend("ui5.gestaoequipamento.Component", {
        metadata: { manifest: "json" },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            const i18nModel = this.getModel(I18N_MODELO);
            const resourceBundle = i18nModel.getResourceBundle();

            const appTitle = resourceBundle.getText(CHAVE_TITULO_APP);

            document.title = appTitle;

            this.getRouter().initialize();
        }
    });
});
