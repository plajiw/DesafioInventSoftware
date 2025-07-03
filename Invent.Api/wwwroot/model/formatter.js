
sap.ui.define([], function () {
    "use strict";

    // Constantes
    const CHAVE_I18N_SIM = "textoDisponibilidadeSim";
    const CHAVE_I18N_NAO = "textoDisponibilidadeNao";

    function _obterMesComIncremento(mes) {
        const incremento = 1;
        return mes + incremento;
    }

    return {
        formatarDisponibilidade: function (bEstaDisponivel) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            const sChaveDeTraducao = bEstaDisponivel ? CHAVE_I18N_SIM : CHAVE_I18N_NAO;

            return oResourceBundle.getText(sChaveDeTraducao);
        },

        formatarData: function (sData) {
            // Converte a string ISO 8601 para objeto Date
            const oDate = new Date(sData);

            // Extrai cada parte da data e adiciona zeros à esquerda
            const quantidadeMaxima = 2;
            const valorDePreenchimento = "0";
            const dia = String(oDate.getDate()).padStart(quantidadeMaxima, valorDePreenchimento);
            const mes = String(_obterMesComIncremento(oDate.getMonth())).padStart(quantidadeMaxima, valorDePreenchimento);
            const ano = oDate.getFullYear();
            const hora = String(oDate.getHours()).padStart(quantidadeMaxima, valorDePreenchimento);
            const minuto = String(oDate.getMinutes()).padStart(quantidadeMaxima, valorDePreenchimento);

            return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
        }
    };
});
