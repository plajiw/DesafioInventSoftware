sap.ui.define([
    "sap/ui/core/mvc/Controller", // Controlador base do SAPUI5
    "sap/ui/model/json/JSONModel", // Modelo para os dados do formulário
    "sap/m/MessageBox", // Para mostrar mensagens de erro
    "sap/ui/core/ValueState", // Para estados visuais dos campos
    "../services/Validador", // Serviço de validação
    "sap/ui/core/UIComponent" // Para gerenciar rotas
], (Controller, JSONModel, MessageBox, ValueState, Validador, UIComponent) => {
    "use strict";

    // Constantes simples
    const MODELO_FORMULARIO = "equipamento"; // Nome do modelo do formulário
    const URL_API = "https://localhost:7178/api/Equipamentos"; // URL da API
    const ROTA_CADASTRO = "cadastroEquipamento"; // Rota da tela de cadastro
    const ROTA_LISTA = "listaEquipamento"; // Rota da tela de lista
    const ROTA_DETALHES = "detalheEquipamento"; // Rota da tela de detalhes

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        // Inicializa a tela de cadastro
        onInit: function () {
            // Cria um modelo vazio para o formulário
            this.getView().setModel(new JSONModel({}), MODELO_FORMULARIO);
            // Limpa os campos ao entrar na tela
            const roteador = UIComponent.getRouterFor(this);
            roteador.getRoute(ROTA_CADASTRO).attachPatternMatched(this._limparCampos, this);
        },

        // Limpa os campos do formulário
        _limparCampos: function () {
            const view = this.getView();
            const modelo = view.getModel(MODELO_FORMULARIO);
            // Reseta os dados do modelo
            modelo.setData({ nome: "", tipo: "", quantidadeEmEstoque: "" });
            // Remove estados de erro dos campos
            view.byId("inputNome").setValueState(ValueState.None);
            view.byId("inputTipo").setValueState(ValueState.None);
            view.byId("inputQuantidade").setValueState(ValueState.None);
        },

        // Valida enquanto o usuário digita
        aoDigitar: function (oEvento) {
            // Obter o campo que disparou o evento
            let campoEntrada = oEvento.getSource();
            console.log("Campo disparado:", campoEntrada);

            // Obter o nome do campo no XML (ex.: inputNome)
            let nomeCampo = campoEntrada.getId().split("--")[1];
            console.log("Nome do campo no XML:", nomeCampo);

            // Define a chave do modelo manualmente
            let chaveModelo;
            if (nomeCampo === "inputNome") {
                chaveModelo = "nome";
            }
            else if (nomeCampo === "inputTipo") {
                chaveModelo = "tipo";
            }
            else if (nomeCampo === "inputQuantidade") {
                chaveModelo = "quantidadeEmEstoque";
            }
            else {
                console.log("Campo não reconhecido, validação ignorada");
                return;
            }
            console.log("Chave do modelo:", chaveModelo);

            // Obtém o valor digitado do evento
            let valorDigitado = oEvento.getParameter("value");
            console.log("Valor digitado:", valorDigitado);

            // Atualiza o modelo
            let modelo = this.getView().getModel(MODELO_FORMULARIO);
            let dados = modelo.getData();
            dados[chaveModelo] = valorDigitado;
            modelo.setData(dados);

            // Valida o campo
            let { estado, mensagemErro } = Validador.validarCampo(chaveModelo, valorDigitado);
            console.log("Validação - Estado:", estado, "Mensagem:", mensagemErro);

            // Aplica o estado e mensagem ao campo
            campoEntrada.setValueState(estado);
            campoEntrada.setValueStateText(mensagemErro);
        },

        // Salva os dados do formulário
        aoClicarEmSalvar: function () {
            const view = this.getView();
            // Valida todos os campos
            let mensagemErro = Validador.validarFormulario(view);
            // Mostra erro se houver
            if (mensagemErro) {
                MessageBox.error(mensagemErro);
                return;
            }

            // Obtém os dados do formulário
            let modelo = view.getModel(MODELO_FORMULARIO);
            let dados = modelo.getData();
            console.log("Dados enviados à API:", dados);

            // Envia os dados para a API
            fetch(URL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: dados.nome,
                    tipo: dados.tipo,
                    quantidadeEmEstoque: Number(dados.quantidadeEmEstoque)
                })
            })
                .then(resposta => resposta.json())
                .then(equipamento => {
                    console.log("Equipamento salvo:", equipamento);
                    // Navega para a tela de detalhes
                    UIComponent.getRouterFor(this).navTo(ROTA_DETALHES, { id: equipamento.id });
                })
                .catch(erro => {
                    console.error("Erro ao salvar:", erro);
                    MessageBox.error("Erro ao salvar o equipamento: " + erro.message);
                });
        },

        // Volta para a tela de lista
        aoClicarEmVoltar: function () {
            UIComponent.getRouterFor(this).navTo(ROTA_LISTA, {}, true);
        }
    });
});