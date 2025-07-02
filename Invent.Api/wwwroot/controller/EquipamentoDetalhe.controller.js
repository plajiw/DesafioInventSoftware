sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "../model/formatter"
], (Controller, JSONModel, MessageBox, Dialog, Button, Text, formatter) => {
    "use strict";

    // --- Constantes do Controller ---
    const NOME_MODELO_DETALHES = "detalhes";
    const NOME_ROTA_LISTA = "listaEquipamento";
    const NOME_ROTA_DETALHES = "detalheEquipamento";
    const NOME_ROTA_EDITAR = "editarEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoDetalhe", {
        formatter: formatter, // Vincula o formatter ao controlador

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
            console.log("MODELO DETALHES:", oModelo);

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
            // Obtém o modelo com os dados atuais do equipamento
            const oModelo = this.getView().getModel(NOME_MODELO_DETALHES);

            // Obtém o ID e nome do equipamento
            const idDoEquipamento = oModelo.getProperty("/id");
            const nomeDoEquipamento = oModelo.getProperty("/nome");

            // Log para depuração
            console.log("Abrindo diálogo para remover:", { id: idDoEquipamento, nome: nomeDoEquipamento });

            // Cria-se o diálogo se ainda não existe
            if (!this.oDialogoConfirmacao) {
                this.oDialogoConfirmacao = new Dialog({
                    title: "Confirmação",
                    type: "Message",
                    content: new Text({
                        text: "" // Texto será atualizado dinamicamente
                    }),
                    beginButton: new Button({
                        text: "Confirmar",
                        type: "Emphasized",
                        press: function () {
                            // Envia a requisição DELETE
                            fetch(`${ENDPOINT_EQUIPAMENTOS}/${this._idEquipamentoRemover}`, { method: "DELETE" })
                                .then(resposta => {
                                    if (!resposta.ok) throw new Error("Erro ao remover equipamento.");
                                    // Fecha o diálogo
                                    this.oDialogoConfirmacao.close();
                                    // Navega para a lista
                                    this.getOwnerComponent().getRouter().navTo(NOME_ROTA_LISTA, {}, true);
                                    // Mostra mensagem de sucesso
                                    MessageBox.success("Equipamento removido com sucesso!");
                                })
                                .catch(erro => {
                                    console.error("Erro ao remover:", erro);
                                    MessageBox.error("Erro ao remover o equipamento: " + erro.message);
                                });
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Cancelar",
                        press: function () {
                            // Fecha o diálogo sem remover
                            this.oDialogoConfirmacao.close();
                        }.bind(this)
                    })
                });
            }

            // Atualiza o texto do diálogo com o nome do equipamento
            this.oDialogoConfirmacao.getContent()[0].setText(
                `Deseja remover o equipamento "${nomeDoEquipamento}"?`
            );

            // Armazena o ID do equipamento para usar na remoção
            this._idEquipamentoRemover = idDoEquipamento;

            // Abre o diálogo
            this.oDialogoConfirmacao.open();
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
