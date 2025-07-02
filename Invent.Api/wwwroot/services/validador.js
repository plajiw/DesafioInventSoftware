sap.ui.define([
    "sap/ui/core/library"
], (coreLibrary) => {
    "use strict";

    const ValueState = coreLibrary.ValueState;

    return {
        validarCampo: function (nomeCampo, valor) {
            let estadoDoCampo = ValueState.None; 
            let mensagemErro = "";

            switch (nomeCampo) {
                case "nome":
                    if (!valor)
                        mensagemErro = "O nome é obrigatório.";
                    if (valor.length < 3 || valor.length > 100)
                        mensagemErro = "O nome deve ter entre 3 e 100 caracteres.";
                    break;

                case "tipo":
                    if (!valor)
                        mensagemErro = "O tipo é obrigatório.";
                    break;

                case "quantidadeEmEstoque":
                    if (!valor)
                        mensagemErro = "A quantidade é obrigatória.";
                    if (Number(valor) < 0)
                        mensagemErro = "A quantidade deve ser maior ou igual a zero.";
                    if (Number(valor) > 10000)
                        mensagemErro = "A quantidade não pode exceder 10.000.";
                    break;
            }

            if (mensagemErro)
                estadoDoCampo = ValueState.Error;

            return { estadoDoCampo, mensagemErro };
        },

        validarFormulario: function (view) {
            // Obtém os valores dos campos na View
            let valorNome = view.byId("inputNome").getValue();
            let valorTipo = view.byId("inputTipo").getValue();
            let valorQuantidade = view.byId("inputQuantidade").getValue();

            console.log("Valores do formulário:", { valorNome, valorTipo, valorQuantidade });

            // Armazena as mensagens de erro
            let mensagensErro = [];

            // Valida o campo nome
            let validacaoNome = this.validarCampo("nome", valorNome);

            if (validacaoNome.mensagemErro) {
                mensagensErro.push(validacaoNome.mensagemErro);
                view.byId("inputNome").setValueState(validacaoNome.estado);
                view.byId("inputNome").setValueStateText(validacaoNome.mensagemErro);
            }

            // Valida o campo tipo
            let validacaoTipo = this.validarCampo("tipo", valorTipo);

            if (validacaoTipo.mensagemErro) {
                mensagensErro.push(validacaoTipo.mensagemErro);
                view.byId("inputTipo").setValueState(validacaoTipo.estado);
                view.byId("inputTipo").setValueStateText(validacaoTipo.mensagemErro);
            }

            // Valida o campo quantidade
            let validacaoQuantidade = this.validarCampo("quantidadeEmEstoque", valorQuantidade);

            if (validacaoQuantidade.mensagemErro) {
                mensagensErro.push(validacaoQuantidade.mensagemErro);
                view.byId("inputQuantidade").setValueState(validacaoQuantidade.estado);
                view.byId("inputQuantidade").setValueStateText(validacaoQuantidade.mensagemErro);
            }

            // Retorna mensagens de erro concatenadas
            return mensagensErro.join("\n");
        }
    };
});