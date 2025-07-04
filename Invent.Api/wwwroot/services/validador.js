sap.ui.define([
    "sap/ui/core/library"
], (coreLibrary) => {
    "use strict";

    // CHAVES I18N
    const CHAVE_I18N_NOME_OBRIGATORIO = "validacaoNomeObrigatorio";
    const CHAVE_I18N_NOME_TAMANHO = "validacaoNomeTamanho";
    const CHAVE_I18N_TIPO_OBRIGATORIO = "validacaoTipoObrigatorio";
    const CHAVE_I18N_QUANTIDADE_OBRIGATORIO = "validacaoQuantidadeObrigatoria";
    const CHAVE_I18N_QUANTIDADE_MINIMO = "validacaoQuantidadeMinima";
    const CHAVE_I18N_QUANTIDADE_MAXIMO = "validacaoQuantidadeMaxima";

    // Constantes
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
                    if (!valor)
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_NOME_OBRIGATORIO);
                    if (valor && (valor.length < nomeMinimoDeCaracteres || valor.length > nomeMaximoDeCaracteres))
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_NOME_TAMANHO);
                    break;

                case "tipo":
                    if (!valor)
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_TIPO_OBRIGATORIO);
                    break;

                case "quantidadeEmEstoque":
                    if (!valor)
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_QUANTIDADE_OBRIGATORIO);
                    if (parseInt(valor) < quantidadeMinimaDeEstoque)
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_QUANTIDADE_MINIMO);
                    if (parseInt(valor) > quantidadeMaximaDeEstoque)
                        mensagemErro = oResourceBundle.getText(CHAVE_I18N_QUANTIDADE_MAXIMO);
                    break;
            }

            if (mensagemErro)
                estadoDoCampo = ValueState.Error;

            return { estadoDoCampo, mensagemErro };
        },

        validarFormulario: function (view, oResourceBundle) {
            // Obtém os valores dos campos na View
            let valorNome = view.byId(ID_INPUT_NOME).getValue();
            let valorTipo = view.byId(ID_INPUT_TIPO).getValue();
            let valorQuantidade = view.byId(ID_INPUT_QUANTIDADE).getValue();

            // Armazena as mensagens de erro
            let mensagensErro = [];

            // Valida o campo nome
            let validacaoNome = this.validarCampo("nome", valorNome, oResourceBundle);

            if (validacaoNome.mensagemErro) {
                mensagensErro.push(validacaoNome.mensagemErro);
                view.byId(ID_INPUT_NOME).setValueState(validacaoNome.estado);
                view.byId(ID_INPUT_NOME).setValueStateText(validacaoNome.mensagemErro);
            }

            // Valida o campo tipo
            let validacaoTipo = this.validarCampo("tipo", valorTipo, oResourceBundle);

            if (validacaoTipo.mensagemErro) {
                mensagensErro.push(validacaoTipo.mensagemErro);
                view.byId(ID_INPUT_TIPO).setValueState(validacaoTipo.estado);
                view.byId(ID_INPUT_TIPO).setValueStateText(validacaoTipo.mensagemErro);
            }

            // Valida o campo quantidade
            let validacaoQuantidade = this.validarCampo("quantidadeEmEstoque", valorQuantidade, oResourceBundle);

            if (validacaoQuantidade.mensagemErro) {
                mensagensErro.push(validacaoQuantidade.mensagemErro);
                view.byId(ID_INPUT_QUANTIDADE).setValueState(validacaoQuantidade.estado);
                view.byId(ID_INPUT_QUANTIDADE).setValueStateText(validacaoQuantidade.mensagemErro);
            }

            // Retorna mensagens de erro concatenadas
            return mensagensErro.join("\n");
        }
    };
});