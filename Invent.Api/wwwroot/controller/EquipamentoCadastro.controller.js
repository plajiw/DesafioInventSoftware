sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/library",
    "../services/Validador",
    "sap/ui/core/UIComponent"
], (Controller, JSONModel, MessageBox, coreLibrary, Validador, UIComponent,) => {
    "use strict";

    // Constantes
    const MODELO_FORMULARIO = "equipamento";
    const URL_API = "/api/Equipamentos";
    const ROTA_CADASTRO = "cadastroEquipamento";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_EDITAR = "editarEquipamento";
    const ID_INPUT_NOME = "inputNome";
    const ID_INPUT_TIPO = "inputTipo";
    const ID_INPUT_QUANTIDADE = "inputQuantidade";

    // Acessamos o ValueState a partir da biblioteca
    const ValueState = coreLibrary.ValueState;

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        // Inicializa a tela de cadastro
        onInit: function () {

            // Cria um modelo vazio para o formulário
            this.getView().setModel(new JSONModel({}), MODELO_FORMULARIO);
            // Obtém o roteador
            const roteador = UIComponent.getRouterFor(this);
            // Configura os gatilhos de acesso para as rotas de cadastro e editar
            roteador.getRoute(ROTA_CADASTRO).attachPatternMatched(this._aoAcessarRota, this);
            roteador.getRoute(ROTA_EDITAR).attachPatternMatched(this._aoAcessarRota, this);
        },

        // Executa automaticamente pelo roteador ao entrar na rota
        _aoAcessarRota: function (oEvento) {
            // Limpa os campos
            this._limparCampos();

            // Se for edição, carrega os dados
            let nomeRota = oEvento.getParameter("name");

            if (nomeRota === ROTA_EDITAR) {
                // Id extraído pelos parâmetros da URL e passa para a função de GET
                let id = oEvento.getParameter("arguments").id;
                this._carregarDadosEdicao(id);
            }
        },

        // Limpa os campos do formulário
        _limparCampos: function () {
            let view = this.getView();
            let modelo = view.getModel(MODELO_FORMULARIO);
            // Reseta os dados do modelo
            modelo.setData({ nome: "", tipo: "", quantidadeEmEstoque: "" });
            // Remove estados de erro dos campos
            view.byId(ID_INPUT_NOME).setValueState(ValueState.None);
            view.byId(ID_INPUT_TIPO).setValueState(ValueState.None);
            view.byId(ID_INPUT_QUANTIDADE).setValueState(ValueState.None);
        },

        // Obtém informações do equipamento para edição
        _carregarDadosEdicao: function (id) {
            let modelo = this.getView().getModel(MODELO_FORMULARIO);
            // GET por ID
            fetch(`${URL_API}/${id}`)
                .then(res => res.json())
                .then(dados => {
                    modelo.setData(dados);
                });
        },

        // Valida enquanto o usuário digita
        aoDigitar: function (oEvento) {
            const SEPARADOR = "--";
            const POSICAO_APOS_PREFIXO = 1;

            // Obter o campo que disparou o evento
            let campoEntrada = oEvento.getSource();

            // Obtém o ID do elemento que disparou o evento
            let idDoCampo = campoEntrada.getId();

            // Remove o prefixo para obter o ID
            let nomeCampo = idDoCampo.split(SEPARADOR)[POSICAO_APOS_PREFIXO];

            // Define a chave do modelo manualmente
            let chaveModelo;

            switch (nomeCampo) {
                case (ID_INPUT_NOME):
                    chaveModelo = "nome";
                    break;

                case (ID_INPUT_TIPO):
                    chaveModelo = "tipo";
                    break;

                case (ID_INPUT_QUANTIDADE):
                    chaveModelo = "quantidadeEmEstoque";
                    break;

                default:
                    break;
            }

            // Obtém o valor digitado do evento
            let valorDigitado = oEvento.getParameter("value");

            // Atualiza o modelo
            let modelo = this.getView().getModel(MODELO_FORMULARIO);
            let dados = modelo.getData();
            dados[chaveModelo] = valorDigitado;
            modelo.setData(dados);

            // Valida o campo
            let { estado, mensagemErro } = Validador.validarCampo(chaveModelo, valorDigitado);

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

            // Define o método e URL
            let id = dados.id;
            let metodo = id ? "PUT" : "POST";
            let url = id ? `${URL_API}/${id}` : URL_API;

            // Envia os dados para a API
            fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: dados.nome,
                    tipo: dados.tipo,
                    quantidadeEmEstoque: Number(dados.quantidadeEmEstoque)
                })
            })
                .then(resposta => resposta.json())
                .then(equipamento => {
                    // Navega para a tela de detalhes
                    UIComponent.getRouterFor(this).navTo(ROTA_DETALHES, { id: equipamento.id });
                })
                .catch(erro => {
                    MessageBox.error("Erro ao salvar o equipamento: " + erro.message);
                });
        },

        // Volta para a tela de lista
        aoClicarEmVoltar: function () {
            UIComponent.getRouterFor(this).navTo(ROTA_LISTA, {}, true);
        }
    });
});