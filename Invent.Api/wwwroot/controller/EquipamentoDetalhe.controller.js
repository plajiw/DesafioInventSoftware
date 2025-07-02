sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    // --- Constantes do Controller ---
    const NOME_MODELO_DETALHES = "detalhes";
    const NOME_ROTA_LISTA = "listaEquipamento";
    const NOME_ROTA_DETALHES = "detalheEquipamento";
    const NOME_ROTA_EDITAR = "editarEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {

        onInit: function () {
            // Cria um modelo JSON local para armazenar os dados do equipamento detalhado
            const oModelo = new JSONModel();
            this.getView().setModel(oModelo, NOME_MODELO_DETALHES);

            // Obtem a rota e anexa o listener para quando ela for acessada
            const oRoteador = this.getOwnerComponent().getRouter();
            oRoteador.getRoute(NOME_ROTA_DETALHES).attachPatternMatched(this._aoCoincidirRota, this);
        },

        // Função para voltar para a lista de equipamentos
        aoClicarEmVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(NOME_ROTA_LISTA, {}, true);
        },

        // Função para navegar para a tela de edição
        aoClicarEmEditar: function () {
            // Obtemos o modelo com os dados atuais do equipamento
            const oModelo = this.getView().getModel(NOME_MODELO_DETALHES);

            // Obtermos o ID do equipamento a partir do modelo
            const idDoEquipamento = oModelo.getProperty("/id");

            // Obtemos a instância do roteador
            const oRoteador = this.getOwnerComponent().getRouter();

            // Navegamos para a rota de edição (cadastro), passando o ID como parâmetro
            oRoteador.navTo(NOME_ROTA_EDITAR, {
                id: idDoEquipamento
            });
        },

        // Função para remover
        aoClicarEmRemover: function () {
            // Obtemos o modelo com os dados atuais do equipamento
            const oModelo = this.getView.getModel(NOME_MODELO_DETALHES);

            // Obtermos o ID do equipamento a partir do modelo
            const idDoEquipamento = oModelo.getProperty("/id");

            fetch(`${ENDPOINT_EQUIPAMENTOS}/${idDoEquipamento}`, {
                method: 'DELETE',
            });
        },

        // Função executada quando a rota de detalhes é acessada
        _aoCoincidirRota: function (oEvento) {
            // Pega o ID dos argumentos do evento da URL
            const id = oEvento.getParameter("arguments").id;

            // Obtemos o modelo "detalhes" da view
            const oModeloDetalhes = this.getView().getModel(NOME_MODELO_DETALHES);

            // Construção da URL da API
            const urlApi = `${ENDPOINT_EQUIPAMENTOS}/${id}`;

            // Chamada fetch para a API para buscar os dados
            fetch(urlApi)
                .then(res => res.json())
                .then(dadosRecebidos => { oModeloDetalhes.setData(dadosRecebidos) })
                .catch(err => console.error("Erro ao buscar detalhes do equipamento:", err));
        }
    });
});
