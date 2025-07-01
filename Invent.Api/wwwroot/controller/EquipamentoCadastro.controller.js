sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/ValueState",
], (Controller, JSONModel, MessageBox, ValueState) => {
    "use strict";

    const NOME_MODELO_FORMULARIO = "equipamento"
    const URL_BASE_API = "https://localhost:7178/api";
    const NOME_CONTROLADOR_EQUIPAMENTOS = "Equipamentos";
    const ENDPOINT_EQUIPAMENTOS = `${URL_BASE_API}/${NOME_CONTROLADOR_EQUIPAMENTOS}`;
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_LISTA = "listaEquipamento";

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        onInit: function () {
            // Cria um JSONModel vazio {} e o associa à view como "equipamento"
            this.getView().setModel(new JSONModel({}), NOME_MODELO_FORMULARIO);
        },

        // Função para salvar o equipamento
        aoClicarEmSalvar: function () {
            // Obtemos a referência da View
            let view = this.getView();

            // Obter os inputs por id
            let inputNome = view.byId("inputNome");
            let inputTipo = view.byId("inputTipo");
            let inputQuantidade = view.byId("inputQuantidade");

            // Limpa os alertas de erro
            inputNome.setValueState(ValueState.None);
            inputTipo.setValueState(ValueState.None);
            inputQuantidade.setValueState(ValueState.None);

            let formularioValido = true;
            let mensagensErro = [];

            // Validação do nome
            let nome = inputNome.getValue();
            if (!nome || nome.length < 3 || nome.length > 100) {
                formularioValido = false;
                inputNome.setValueState(ValueState.Error);
                mensagensErro.push("O nome é obrigatório e deve ter entre 3 e 100 caracteres.");

            }

            // Validação do tipo
            let tipo = inputTipo.getValue();
            if (!tipo || tipo.length < 3 || tipo.length > 100) {
                formularioValido = false;
                inputTipo.setValueState(ValueState.Error);
                mensagensErro.push("O campo Tipo é obrigatório.");
            }

            // Validação da Quantidade
            let quantidade = inputQuantidade.getValue();
            if (quantidade === "") {
                formularioValido = false;
                inputQuantidade.setValueState(ValueState.Error);
                mensagensErro.push("O campo Quantidade é obrigatório.");

            } else if (isNaN(quantidade) || Number(quantidade) < 0 || Number(quantidade) >= 10000) {
                formularioValido = false;
                inputQuantidade.setValueState(ValueState.Error);
                mensagensErro.push("A quantidade deve ser um número entre 0 e 10.000.");
            }

            // Retorno das validações
            if (!formularioValido) {

                let mensagemFinal = mensagensErro.join("\n");
                MessageBox.error(mensagemFinal);
                return; // Interrompe a função aqui
            }

            // A partir da View, obtemos o modelo de dados
            let modeloDoFormulario = view.getModel(NOME_MODELO_FORMULARIO);
            // Extrai os dados preenchidos
            let dadosParaSalvar = modeloDoFormulario.getData();

            // Configurações da requisição POST
            const opcoesDaRequisicao = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosParaSalvar)
            };

            // Fetch para realizar o PUT
            fetch(ENDPOINT_EQUIPAMENTOS, opcoesDaRequisicao)
                .then(resposta => resposta.json()) // Converte o json em objeto JS
                .then(equipamentoCriado => {
                    // Vamos encaminhar para a tela de "detalhes" usando o novo id
                    let novoId = equipamentoCriado.id;
                    let componenteRota = this.getOwnerComponent().getRouter();
                    componenteRota.navTo(ROTA_DETALHES, { id: novoId })
                })
                .catch(erro => {
                    console.error("Ocorreu um erro ao salvar o equipamento: ", erro);
                })
        },

        // Função para retornar até a página de lista
        aoClicarEmVoltar: function () {
            let componenteRota = this.getOwnerComponent().getRouter();
            componenteRota.navTo(ROTA_LISTA)
        },
    });
});