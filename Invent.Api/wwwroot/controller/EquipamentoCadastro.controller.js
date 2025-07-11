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
    const MODELO_I18N = "i18n";
    const CHAVE_I18N_TIPO_EQUIPAMENTO = "tipoEquipamento";
    const ENDPOINT_EQUIPAMENTOS = "api/Equipamentos";
    const ROTA_CADASTRO = "cadastroEquipamento";
    const ROTA_DETALHES = "detalheEquipamento";
    const ROTA_EDITAR = "editarEquipamento";
    const ID_INPUT_NOME = "inputNome";
    const ID_INPUT_TIPO = "inputTipo";
    const ID_INPUT_QUANTIDADE = "inputQuantidade";
    const PARAMETRO_DE_VALOR = "value";
    const ARGUMENTOS_DA_ROTA = "arguments";
    const PROPRIEDADE_NOME = "nome";
    const PROPRIEDADE_ESTOQUE = "quantidadeEmEstoque";

    const ValueState = coreLibrary.ValueState;

    return Controller.extend("ui5.gestaoequipamento.controller.EquipamentoCadastro", {
        _id: null,

        onInit: function () {
            let oModelo = new JSONModel({});
            this.getView().setModel(oModelo, MODELO_EQUIPAMENTO);

            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_I18N).getResourceBundle();

            const arrayDeTipos = this._criarListaDeTipos();
            let oModeloTipo = new JSONModel({ values: arrayDeTipos });
            this.getView().setModel(oModeloTipo, MODELO_TIPOS);

            this.roteador = UIComponent.getRouterFor(this);
            this.roteador.getRoute(ROTA_CADASTRO).attachPatternMatched(this._aoAcessarCadastro, this);
            this.roteador.getRoute(ROTA_EDITAR).attachPatternMatched(this._aoAcessarEditar, this);
        },

        _criarListaDeTipos: function () {
            const totalDeTipos = 12;
            const tipos = [];
            for (let i = 0; i < totalDeTipos; i++) {
                tipos.push({
                    key: i,
                    text: this._oResourceBundle.getText(`${CHAVE_I18N_TIPO_EQUIPAMENTO}${i}`)
                });
            }
            return tipos;
        },

        _obterModeloEquipamento: function () {
            return this.getView().getModel(MODELO_EQUIPAMENTO);
        },

        _aoAcessarCadastro: function () {
            this._limparCampos();
        },

        _aoAcessarEditar: function (oEvento) {
            this._limparCampos();
            this._id = oEvento.getParameter(ARGUMENTOS_DA_ROTA).id;
            this._carregarDadosEdicao(this._id);
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
                .then(res => res.json())
                .then(dados => oModelo.setData(dados));
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
                    chaveModelo = PROPRIEDADE_NOME;
                    break;
                case ID_INPUT_QUANTIDADE:
                    chaveModelo = PROPRIEDADE_ESTOQUE;
                    break;
                default:
                    break;
            }

            let valorDigitado = oEvento.getParameter(PARAMETRO_DE_VALOR);

            let oModelo = this._obterModeloEquipamento();
            let dados = oModelo.getData();
            dados[chaveModelo] = valorDigitado;
            oModelo.setData(dados);

            let { estadoDoCampo, mensagemErro } = Validador.validarCampo(chaveModelo, valorDigitado, this._oResourceBundle);

            campoEntrada.setValueState(estadoDoCampo);
            campoEntrada.setValueStateText(mensagemErro);
        },

        aoMudarTipo: function (oEvento) {
            const chaveDoTipo = "selectedKey"
            const campoEntrada = oEvento.getSource();
            const valorSelecionado = oEvento.getParameter(chaveDoTipo);

            let oModelo = this._obterModeloEquipamento();
            let dados = oModelo.getData();
            dados.tipo = valorSelecionado;
            oModelo.setData(dados);

            campoEntrada.setValueState(ValueState.None);
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
                tipo: parseInt(dados.tipo),
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
                .then(resposta => {
                    if (resposta.status == 201)
                        return resposta.json()
                })
                .then(equipamento => {
                    this._id ??= equipamento?.id;
                    this.roteador.navTo(ROTA_DETALHES, { id: this._id });
                    this._id = null;
                });
        },

        _validarFormulario: function () {
            const view = this.getView();
            const errosEncontrados = Validador.validarFormulario(view, this._oResourceBundle);

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