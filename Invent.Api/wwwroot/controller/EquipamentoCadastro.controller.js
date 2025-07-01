sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    // Constantes
    const NOME_MODELO_FORMULARIO = "equipamento";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_CADASTRO = "cadastroEquipamento";
    const ROTA_DETALHE = "detalheEquipamento";
    const NOME_CONTROLADOR_EQUIPAMENTOS = "Equipamentos";
    const URL_BASE_API = "https://localhost:7178/api";
    const ENDPOINT_EQUIPAMENTOS = `${URL_BASE_API}/${NOME_CONTROLADOR_EQUIPAMENTOS}`;

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        onInit: function () {
            // Cria um JSONModel vazio {} e associa à view como “equipamento”
            this.getView().setModel(new JSONModel({}), NOME_MODELO_FORMULARIO);

            // Obtem o roteador para poder reagir à rota de cadastro (Component.js -> manifest.json)
            const oRoteador = this.getOwnerComponent().getRouter();
            oRoteador.getRoute(ROTA_CADASTRO).attachPatternMatched(this._aoCoincidirRotaCadastro, this);
        },

        aoClicarEmSalvar: function () {
            const oDadosDoFormulario = this.getView().getModel(NOME_MODELO_FORMULARIO).getData();

            // Lógica de Cadastro (POST)
            this._criarEquipamentoNaAPI(oDadosDoFormulario);
        },

        // Retornar para a página de lista
        aoClicarEmVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(ROTA_LISTA);
        },

        // Função para reinicializar o estado do formulário
        // Assim que acessar "cadastroEquipamento" o método é disparado
        // Refinimos o modelo "equipamento" para um objeto vazio 
        _aoCoincidirRotaCadastro: function () {
            this.getView().getModel(NOME_MODELO_FORMULARIO).setData({});
        },

        // Função privada para encapsular a lógica de chamada da API para criar
        _criarEquipamentoNaAPI: function (oDadosDoEquipamento) {
            fetch(ENDPOINT_EQUIPAMENTOS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(oDadosDoEquipamento)
            })
                .then(resposta => {
                    if (!resposta.ok) {
                        return resposta.json().then(erro => { throw new Error(erro.message || "Falha ao criar equipamento") });
                    }
                    return resposta.json();
                })
                .then(dadosCriados => {

                    // 1. Navegamos para a tela de detalhes
                    this._navegarParaDetalhes(dadosCriados.id);

                    // Exibição do MessageToast
                    setTimeout(() => {
                        MessageToast.show("Equipamento cadastrado com sucesso!");
                    }, 300);
                })
                .catch(erro => {
                    MessageBox.error(`Ocorreu um erro ao tentar cadastrar: ${erro.message}`);
                });
        },

        // Função privada para encapsular a lógica de navegação
        _navegarParaDetalhes: function (sId) {
            const oRoteador = this.getOwnerComponent().getRouter();
            oRoteador.navTo(ROTA_DETALHE, { id: sId }, true); // O 'true' limpa o histórico
        }
    });
});