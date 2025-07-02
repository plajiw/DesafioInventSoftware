sap.ui.define([
    "sap/ui/core/ValueState" // Para estados visuais dos campos
], (ValueState) => {
    "use strict";

    return {
        // Valida um campo com base em seu nome e valor inserido
        validarCampo: function (nomeCampo, valor) {
            // Inicializa estado (sem erro) e mensagem vazia
            let estado = ValueState.None;
            let mensagemErro = "";

            // Verifica o campo nome
            if (nomeCampo === "nome") {
                // Nome não pode ser vazio ou ter menos de 3 ou mais de 100 caracteres
                if (!valor) {
                    mensagemErro = "O nome é obrigatório.";
                    estado = ValueState.Error;
                } else if (valor.length < 3 || valor.length > 100) {
                    mensagemErro = "O nome deve ter entre 3 e 100 caracteres.";
                    estado = ValueState.Error;
                }
            }
            // Verifica o campo tipo
            else if (nomeCampo === "tipo") {
                // Tipo não pode ser vazio
                if (!valor) {
                    mensagemErro = "O tipo é obrigatório.";
                    estado = ValueState.Error;
                }
            }
            // Verifica o campo quantidade
            else if (nomeCampo === "quantidadeEmEstoque") {
                // Quantidade deve ser um número entre 0 e 10.000 e não pode ser vazio
                if (valor === "" || valor === null || valor === undefined) {
                    mensagemErro = "A quantidade é obrigatória.";
                    estado = ValueState.Error;
                } else if (isNaN(valor) || Number(valor) < 0) {
                    mensagemErro = "A quantidade deve ser maior ou igual a zero.";
                    estado = ValueState.Error;
                } else if (Number(valor) > 10000) {
                    mensagemErro = "A quantidade não pode exceder 10.000.";
                    estado = ValueState.Error;
                }
            }

            // Retorna um objeto com os estados e mensagens de erro
            return { estado, mensagemErro };
        },

        // Valida todos os campos do formulário
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