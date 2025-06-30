sap.ui.define([], () => {
	"use strict";

	// Constantes 

	const NOME_MODELO_I18N = "i18n";
	const CHAVE_I18N_SIM = "textoDisponibilidadeSim";
	const CHAVE_I18N_NAO = "textoDisponibilidadeNao";

	function _obterMesComIncremento(mes) {
		const incremento = 1;
		return mes + incremento;
	}

	return {

		formatarDisponibilidade: function (bEstaDisponivel) {
			// Acessamos a View e obtemos o "i18n"
			const oModeloI18n = this.getView().getModel(NOME_MODELO_I18N);
			const oResourceBundle = oModeloI18n.getResourceBundle();

			// Escolhe a chave de tradução com base no valor booleano
			const sChaveDeTraducao = bEstaDisponivel ? CHAVE_I18N_SIM : CHAVE_I18N_NAO;

			// Retorna o texto traduzido a partir da chave
			return oResourceBundle.getText(sChaveDeTraducao);
		},

		// Função para formatar a data
		formatarData: function (sData) {
			// Converte a string no modelo ISO 8601 para um objeto Date
			const oDate = new Date(sData);

			// Extrai cada parte da data e acrescente o '0'
			const quantidadeMaxima = 2;
			const valorDePreenchimento = '0';
			const dia = String(oDate.getDate()).padStart(quantidadeMaxima, valorDePreenchimento);
			const mes = String(_obterMesComIncremento(oDate.getMonth())).padStart(quantidadeMaxima, valorDePreenchimento); // Incrementa, pois por padrão js inicia no mês "0"
			const ano = oDate.getFullYear();
			const hora = oDate.getHours();
			const minuto = oDate.getMinutes();

			// Junta tudo em uma única string
			return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
		},
	};
});