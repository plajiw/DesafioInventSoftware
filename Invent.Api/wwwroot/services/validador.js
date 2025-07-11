sap.ui.define([
    "sap/ui/core/library"
], (coreLibrary) => {
    "use strict";

    const CHAVE_I18N_NOME_OBRIGATORIO = "validacaoNomeObrigatorio";
    const CHAVE_I18N_NOME_TAMANHO = "validacaoNomeTamanho";
    const CHAVE_I18N_TIPO_OBRIGATORIO = "validacaoTipoObrigatorio";
    const CHAVE_I18N_QUANTIDADE_OBRIGATORIO = "validacaoQuantidadeObrigatoria";
    const CHAVE_I18N_QUANTIDADE_MINIMO = "validacaoQuantidadeMinima";
    const CHAVE_I18N_QUANTIDADE_MAXIMO = "validacaoQuantidadeMaxima";

    const ID_INPUT_NOME = "inputNome";
    const ID_INPUT_TIPO = "inputTipo";
    const ID_INPUT_QUANTIDADE = "inputQuantidade";

    const ValueState = coreLibrary.ValueState;

    return {
        validarCampo: function (nomeCampo, valor, oResourceBundle) {
            const nomeMinimoDeCaracteres = 3;
            const nomeMaximoDeCaracteres = 100;
            const quantidadeMinimaDeEstoque = 0;
            const quantidadeMaximaDeEstoque = 10000;

            let estadoDoCampo = ValueState.None;
            let mensagemErro = "";

            switch (nomeCampo) {
                case "nome":
                    if (!valor || valor === "") {
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_NOME_OBRIGATORIO);
                        estadoDoCampo = ValueState.Error;
                    } 
                    if (valor.length < nomeMinimoDeCaracteres || valor.length > nomeMaximoDeCaracteres) {
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_NOME_TAMANHO);
                        estadoDoCampo = ValueState.Error;
                    }
                    break;

                case "tipo":
                    if (valor === undefined || valor === null || valor === "") {
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_TIPO_OBRIGATORIO);
                        estadoDoCampo = ValueState.Error;
                    }
                    break;

                case "quantidadeEmEstoque":
                    if (!valor || valor === "") {
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_QUANTIDADE_OBRIGATORIO);
                        estadoDoCampo = ValueState.Error;
                    }
                    if (parseInt(valor) < quantidadeMinimaDeEstoque) {
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_QUANTIDADE_MINIMO);
                        estadoDoCampo = ValueState.Error;
                    }
                    if (parseInt(valor) > quantidadeMaximaDeEstoque) {
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_QUANTIDADE_MAXIMO);
                        estadoDoCampo = ValueState.Error;
                    }
                    break;
            }

            return { estadoDoCampo, mensagemErro };
        },

        validarFormulario: function (view, oResourceBundle) {
            const campos = [
                { id: ID_INPUT_NOME, chave: "nome", getValue: () => view.byId(ID_INPUT_NOME).getValue() },
                { id: ID_INPUT_TIPO, chave: "tipo", getValue: () => view.byId(ID_INPUT_TIPO).getSelectedKey() },
                { id: ID_INPUT_QUANTIDADE, chave: "quantidadeEmEstoque", getValue: () => view.byId(ID_INPUT_QUANTIDADE).getValue() }
            ];

            const mensagensErro = [];

            campos.forEach(({ id, chave, getValue }) => {
                const validacao = this.validarCampo(chave, getValue(), oResourceBundle);
                const campo = view.byId(id);

                campo.setValueState(validacao.estadoDoCampo);
                campo.setValueStateText(validacao.mensagemErro);

                if (validacao.mensagemErro) {
                    mensagensErro.push(validacao.mensagemErro);
                }
            });

            return mensagensErro.length > 0 ? mensagensErro.join("\n") : null;
        }
    };
});