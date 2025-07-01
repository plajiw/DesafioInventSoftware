sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/ValueState",
    "../services/Validador",
    "sap/ui/core/UIComponent"
], (Controller, JSONModel, MessageBox, ValueState, Validador, UIComponent) => {
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
            UIComponent.getRouterFor(this).getRoute("cadastroEquipamento").attachPatternMatched(() => {this._iniciarCamposLimpos(), this});
        },
        
        _iniciarCamposLimpos: function()
        {
            let view = this.getView();

            let inputNome = view.byId("inputNome");
            let inputTipo = view.byId("inputTipo");
            let inputQuantidade = view.byId("inputQuantidade");

            inputNome.setValueState(ValueState.None);
            inputTipo.setValueState(ValueState.None);
            inputQuantidade.setValueState(ValueState.None);
        },

        // Função para salvar o equipamento
        aoClicarEmSalvar: function () {
            // Obtemos a referência da View
            let view = this.getView();

            // Chamamos nosso serviço para fazer a validação
            let resultadoValidacao = Validador.validar(view);

            // Verificamos o resultado
            if (resultadoValidacao.ehInvalido) {
                let mensagemFinal = resultadoValidacao.mensagens.join("\n");
                MessageBox.error(mensagemFinal);

                // Lógica para colorir apenas os campos que deram erro
                if (resultadoValidacao.mensagens.some(msg => msg.includes("nome"))) {
                    view.byId("inputNome").setValueState(ValueState.Error);
                }
                if (resultadoValidacao.mensagens.some(msg => msg.includes("Tipo"))) {
                    view.byId("inputTipo").setValueState(ValueState.Error);
                }
                if (resultadoValidacao.mensagens.some(msg => msg.includes("Quantidade"))) {
                    view.byId("inputQuantidade").setValueState(ValueState.Error);
                }
                
                return; // Interrompe a função
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

            // Fetch para realizar o POST
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
            componenteRota.navTo(ROTA_LISTA, {}, true);
        },
    });
});