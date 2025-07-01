sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
      "../model/formatter"
], (Controller, JSONModel, formatter) => {
    "use strict";

    const MODELO_DE_DETALHES_EQUIPAMENTOS = "detalhes";
    const ROTA_PARA_LISTA = "listaEquipamento";
    const ROTA_PARA_DETALHES = "detalheEquipamento";
    const URL_BASE_API = "https://localhost:7178/api";
    const NOME_CONTROLADOR_EQUIPAMENTOS = "Equipamentos";
    const ENDPOINT_EQUIPAMENTOS = `${URL_BASE_API}/${NOME_CONTROLADOR_EQUIPAMENTOS}`;

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {
    formatter: formatter,

        onInit: function () {
            // Cria um modelo JSON local para armazenar os dados do equipamento detalhado
            const oModelo = new JSONModel();
            this.getView().setModel(oModelo, MODELO_DE_DETALHES_EQUIPAMENTOS);

            // Obtem a rota e verifica os ID
            const oRoteador = this.getOwnerComponent().getRouter();
            oRoteador.getRoute(ROTA_PARA_DETALHES).attachPatternMatched(this._aoCoincidirRota, this);
        },

        // Função para voltar para a lista de equipamentos
        aoClicarEmVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(ROTA_PARA_LISTA);
        },

        // Função para obter o ID
        _aoCoincidirRota: function (oEvento) {
            // Pega o ID dos argumentos do evento
            const id = oEvento.getParameter("arguments").id;
            console.log("ID do Equipamento a ser buscado:", id);

            // Obtemos o modelo "detalhes" da view
            const oModeloDetalhes = this.getView().getModel(MODELO_DE_DETALHES_EQUIPAMENTOS);

            // Construção da URL
            const urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;
            console.log("Endpoint acessado:", urlApi);

            // Chamada fetch para API
            fetch(urlApi)
                .then(res => res.json())
                .then(dados => { oModeloDetalhes.setData(dados)})
                .catch(err => console.error(err));
        }
    });
});