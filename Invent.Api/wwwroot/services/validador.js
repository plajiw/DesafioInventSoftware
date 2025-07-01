sap.ui.define([
    "sap/ui/core/ValueState",
], (ValueState) => {
    "use strict";

    return {
        validar: function (view) {
            
            // Obter os inputs por id
            

            // Limpa os alertas de erro
            

            // Coleta os valores para enviar ao validador
            let dadosParaValidar = {
                nome: view.byId("inputNome").getValue(),
                tipo: view.byId("inputTipo").getValue(),
                quantidade: view.byId("inputQuantidade").getValue()
            };

            // Inicia as variáveis de controle da validação.
            let formularioValido = false;
            let mensagensErro = [];

            // Validação do nome
            let nome = dadosParaValidar.nome;
            if (!nome || nome.length < 3 || nome.length > 100) {
                formularioValido = true;
                mensagensErro.push("O nome é obrigatório e deve ter entre 3 e 100 caracteres.");
            }

            // Validação do tipo
            let tipo = dadosParaValidar.tipo;
            if (!tipo || tipo.length < 3 || tipo.length > 100) {
                formularioValido = true;
                mensagensErro.push("O campo Tipo é obrigatório e deve ter entre 3 e 100 caracteres.");
            }

            // Validação da Quantidade
            let quantidade = dadosParaValidar.quantidade;
            if (quantidade === "") {
                formularioValido = true;
                mensagensErro.push("O campo Quantidade é obrigatório.");
            } else if (isNaN(quantidade) || Number(quantidade) < 0 || Number(quantidade) >= 10000) {
                formularioValido = true;
                mensagensErro.push("A quantidade deve ser um número entre 0 e 9.999.");
            }

            // Retorna um objeto com o resultado final
            return {
                ehInvalido: formularioValido,
                mensagens: mensagensErro
            };
        }
    };
});