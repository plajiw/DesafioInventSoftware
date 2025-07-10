
sap.ui.define([], function () {
    "use strict";

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
            const oDate = new Date(sData);

            const quantidadeMaxima = 2;
            const valorDePreenchimento = "0";
            const dia = String(oDate.getDate()).padStart(quantidadeMaxima, valorDePreenchimento);
            const mes = String(_obterMesComIncremento(oDate.getMonth())).padStart(quantidadeMaxima, valorDePreenchimento);
            const ano = oDate.getFullYear();
            const hora = String(oDate.getHours()).padStart(quantidadeMaxima, valorDePreenchimento);
            const minuto = String(oDate.getMinutes()).padStart(quantidadeMaxima, valorDePreenchimento);

            return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
        },

        formatarTipo: function (indiceDoTipo) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            let chaveParaTraducao = `tipoEquipamento${indiceDoTipo}`
            return oResourceBundle.getText(chaveParaTraducao);

            // const arrayDeTipo = [
            //     "Desktop",
            //     "Notebook",
            //     "Smartphone",
            //     "Tablet",
            //     "TV",
            //     "Monitor",
            //     "Teclado",
            //     "Mouse",
            //     "Impressora",
            //     "Webcam",
            //     "Headset",
            // ];

            // return arrayDeTipo[indiceDoTipo];
        }
    };
});
