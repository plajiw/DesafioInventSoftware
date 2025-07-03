sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/UIComponent"
], (Controller, JSONModel, formatter, UIComponent) => {
    "use strict";

    // Constantes
    const NOME_MODELO_DETALHES = "detalhes";
    const NOME_ROTA_LISTA = "listaEquipamento";
    const NOME_ROTA_DETALHES = "detalheEquipamento";
    const NOME_ROTA_EDITAR = "editarEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {
        formatter: formatter,

        onInit: function () {
            // Cria um modelo JSON local para armazenar os dados do equipamento detalhado
            const oModelo = new JSONModel();
            this.getView().setModel(oModelo, NOME_MODELO_DETALHES);

            const roteador = UIComponent.getRouterFor(this);
            roteador.getRoute(NOME_ROTA_DETALHES).attachPatternMatched(this._aoCoincidirRota, this);
        },

        aoClicarEmVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(NOME_ROTA_LISTA, {}, true);
        },

        aoClicarEmEditar: function () {
            const caminhoIdEquipamento = "/id";
            const oModelo = this.getView().getModel(NOME_MODELO_DETALHES);
            const idDoEquipamento = oModelo.getProperty(caminhoIdEquipamento);

            // Obtemos a instância do roteador
            const oRoteador = this.getOwnerComponent().getRouter();
            // Navegamos para a rota de edição (cadastro), passando o ID como parâmetro
            oRoteador.navTo(NOME_ROTA_EDITAR, {
                id: idDoEquipamento
            });
        },

        aoClicarEmRemover: function () {
        },

        _aoCoincidirRota: function (oEvento) {
            const argumentosDaRota = "arguments"
            // Pega o ID dos argumentos do evento da URL
            const id = oEvento.getParameter(argumentosDaRota).id;
            // Obtemos o modelo "detalhes" da view
            const oModeloDetalhes = this.getView().getModel(NOME_MODELO_DETALHES);
            const urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;
            // Chamada fetch para a API para buscar os dados
            fetch(urlApi)
                .then(res => res.json())
                .then(dadosRecebidos => { oModeloDetalhes.setData(dadosRecebidos) })
                .catch(err => console.error("Erro ao buscar detalhes do equipamento:", err));
        }
    });
});
