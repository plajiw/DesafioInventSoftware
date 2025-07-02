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

            this.getView().setModel(new JSONModel({}), MODELO_FORMULARIO);
            // Obtém o roteador
            this.roteador = UIComponent.getRouterFor(this);
            // Configura os gatilhos de acesso para as rotas de cadastro e editar
            this.roteador.getRoute(ROTA_CADASTRO).attachPatternMatched(this._aoAcessarRota, this);
            this.roteador.getRoute(ROTA_EDITAR).attachPatternMatched(this._aoAcessarRota, this);
        },

        _aoAcessarRota: function (oEvento) {
            this._limparCampos();

            let nomeRota = oEvento.getParameter("name");
            if (nomeRota === ROTA_EDITAR) {
                // Id extraído pelos parâmetros do evento e passa para a função de GET
                let id = oEvento.getParameter("arguments").id;
                this._carregarDadosEdicao(id);
            }
        },

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

        _carregarDadosEdicao: function (id) {
            let modelo = this.getView().getModel(MODELO_FORMULARIO);
            // GET por ID
            fetch(`${URL_API}/${id}`)
                .then(res => res.json())
                .then(dados => {
                    modelo.setData(dados);
                });
        },

        aoDigitar: function (oEvento) {
            const SEPARADOR = "--";
            const POSICAO_APOS_PREFIXO = 1;

            // Obter o campo que disparou o evento
            let campoEntrada = oEvento.getSource();

            // Obtém o ID do elemento que disparou o evento
            let idDoCampo = campoEntrada.getId();

            // Remove o prefixo para obter o ID
            let nomeCampo = idDoCampo.split(SEPARADOR)[POSICAO_APOS_PREFIXO];

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

        aoClicarEmSalvar: function () {
            let metodo ="POST";
            let url = URL_API;

            const view = this.getView();
            let errosEncontrados = Validador.validarFormulario(view);
            if (errosEncontrados) {
                MessageBox.error(errosEncontrados);
                return;
            }

            let modelo = view.getModel(MODELO_FORMULARIO);
            let dados = modelo.getData();
            if(dados.id){
                metodo = "PUT";
                url = `${URL_API}/${dados.id}`
            }

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
                    this.roteador.navTo(ROTA_DETALHES, { id: equipamento.id });
                })
                .catch(erro => {
                    MessageBox.error("Erro ao salvar o equipamento: " + erro.message);
                });
        },

        aoClicarEmVoltar: function () {
            this.roteador.navTo(ROTA_LISTA, {}, true);
        }
    });
});