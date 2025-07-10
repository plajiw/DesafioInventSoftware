sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/library",
    "../services/Validador",
    "sap/ui/core/UIComponent"
], (Controller, JSONModel, MessageBox, coreLibrary, Validador, UIComponent) => {
    "use strict";

    const MODELO_EQUIPAMENTO = "equipamentos";
    const MODELO_TIPOS = "tipos";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
    const ROTA_CADASTRO = "cadastroEquipamento";
    const ROTA_LISTA = "listaEquipamento";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_EDITAR = "editarEquipamento";
    const ID_INPUT_NOME = "inputNome";
    const ID_INPUT_TIPO = "inputTipo";
    const ID_INPUT_QUANTIDADE = "inputQuantidade";

    const ValueState = coreLibrary.ValueState;

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        onInit: function () {
            let oModelo = new JSONModel({});
            this.getView().setModel(oModelo, MODELO_EQUIPAMENTO);

            const arrayDeTipos = [
                { key: 0, text: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tipoEquipamento0") },
                { key: 1, text: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tipoEquipamento1") },
                { key: 2, text: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tipoEquipamento2") },
                { key: 3, text: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tipoEquipamento3") }
            ];

            let oModeloTipo = new JSONModel({ values: arrayDeTipos });
            this.getView().setModel(oModeloTipo, MODELO_TIPOS);

            this.roteador = UIComponent.getRouterFor(this);
            this.roteador.getRoute(ROTA_CADASTRO).attachPatternMatched(this._aoAcessarCadastro, this);
            this.roteador.getRoute(ROTA_EDITAR).attachPatternMatched(this._aoAcessarEditar, this);
        },

        _obterModeloEquipamento: function () {
            return this.getView().getModel(MODELO_EQUIPAMENTO);
        },

        _aoAcessarCadastro: function () {
            this._limparCampos();
        },

        _aoAcessarEditar: function (oEvento) {
            const argumentosDaRota = "arguments";
            this._limparCampos();
            const id = oEvento.getParameter(argumentosDaRota).id;
            this._carregarDadosEdicao(id);
        },

        _limparValueStateCampos(idDoInput) {
            const view = this.getView();
            const campo = view.byId(idDoInput);
            campo.setValueState(ValueState.None);
        },

        _limparCampos: function () {
            let view = this.getView();
            view.setModel(new JSONModel({}), MODELO_EQUIPAMENTO);
            this._limparValueStateCampos(ID_INPUT_NOME);
            this._limparValueStateCampos(ID_INPUT_TIPO);
            this._limparValueStateCampos(ID_INPUT_QUANTIDADE);
        },

        _carregarDadosEdicao: function (id) {
            let oModelo = this._obterModeloEquipamento();
            fetch(`${ENDPOINT_EQUIPAMENTOS}/${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Erro HTTP: ${res.status}`);
                    }
                    return res.json();
                })
                .then(dados => {
                    if (Array.isArray(dados)) {
                        throw new Error("API retornou uma lista em vez de um único equipamento");
                    }
                    oModelo.setData(dados);
                })
                .catch(err => {
                    MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("erroCarregarEquipamento"));
                });
        },

        aoDigitar: function (oEvento) {
            const separador = "--";
            const posicaoAposPrefixo = 1;

            let campoEntrada = oEvento.getSource();
            let idDoCampo = campoEntrada.getId();
            let nomeCampo = idDoCampo.split(separador)[posicaoAposPrefixo];

            let chaveModelo;
            switch (nomeCampo) {
                case ID_INPUT_NOME:
                    chaveModelo = "nome";
                    break;
                // case ID_INPUT_TIPO:
                //     chaveModelo = "tipo";
                //     break;
                case ID_INPUT_QUANTIDADE:
                    chaveModelo = "quantidadeEmEstoque";
                    break;
                default:
                    break;
            }

            let valorDigitado = oEvento.getParameter("value");

            let oModelo = this._obterModeloEquipamento();
            let dados = oModelo.getData();
            dados[chaveModelo] = valorDigitado;
            oModelo.setData(dados);

            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            let { estadoDoCampo, mensagemErro } = Validador.validarCampo(chaveModelo, valorDigitado, oResourceBundle);

            campoEntrada.setValueState(estadoDoCampo);
            campoEntrada.setValueStateText(mensagemErro);
        },

        _configurarRequisicao: function (id, dados) {
            const metodoPUT = "PUT";
            const metodoPOST = "POST";

            const metodo = id ? metodoPUT : metodoPOST;
            const url = id ? `${ENDPOINT_EQUIPAMENTOS}/${id}` : ENDPOINT_EQUIPAMENTOS;

            const corpoDaRequisicao = this._configurarCorpoDaRequisicao(dados);
            this._executarRequisicao(metodo, url, corpoDaRequisicao);
        },

        _configurarCorpoDaRequisicao: function (dados) {
            const corpoDaRequisicao = {
                id: dados.id || null,
                nome: dados.nome,
                tipo: dados.tipo,
                quantidadeEmEstoque: parseInt(dados.quantidadeEmEstoque)
            };

            return corpoDaRequisicao;
        },

        _executarRequisicao: function (metodo, url, corpoDaRequisicao) {
            fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(corpoDaRequisicao)
            })
                .then(resposta => resposta.json())
                .then(equipamento => this.roteador.navTo(ROTA_DETALHES, { id: equipamento.id }));
        },

        _validarFormulario: function () {
            const view = this.getView();
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const errosEncontrados = Validador.validarFormulario(view, oResourceBundle);

            if (errosEncontrados) MessageBox.error(errosEncontrados);

            return !errosEncontrados;
        },

        aoClicarEmSalvar: function () {
            if (this._validarFormulario()) {
                let dados = this._obterModeloEquipamento().getData();
                this._configurarRequisicao(dados.id, dados);
            }
        },

        aoClicarEmVoltar: function () {
            window.history.back();
        }
    });
});