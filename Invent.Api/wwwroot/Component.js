sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/resource/ResourceModel"
], (UIComponent, ResourceModel) => {
  "use strict";

  // Constante
  const I18N_MODELO = "i18n";
  const CHAVE_TITULO_APP = "tituloAplicacao";

  // Componente herda as funcionalidades do UIComponent 
  return UIComponent.extend("ui5.gestaoequipamento.Component", {
    // Aponta para as configurações
    metadata: { manifest: "json" },

    init() {
      // Inicializa o Component.js que lê o manifest
      UIComponent.prototype.init.apply(this, arguments);

      // Obtemos o modelo i18n preparado no manifest
      const i18nModel = this.getModel(I18N_MODELO);
      const resourceBundle = i18nModel.getResourceBundle();

      const appTitle = resourceBundle.getText(CHAVE_TITULO_APP);

      // Define o título da aba do navegador
      document.title = appTitle;

      // Renderiza a tela inicial determinada no manifest
      this.getRouter().initialize();
    }
  });
});
