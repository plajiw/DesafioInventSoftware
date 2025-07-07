sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

	const SEGUNDO_SEGMENTO_DA_URL = 1;

    let equipamentos = [
        { id: "Equip-1-A", nome: "Teste 1", tipo: "Eletrônico", quantidadeEmEstoque: 10 },
        { id: "Equip-2-A", nome: "Teste 2", tipo: "Eletrônico", quantidadeEmEstoque: 100 }
    ];

    // Função para simular chamadas API
    function mockFetch(url, opcoesFetch) {
        if (opcoesFetch && opcoesFetch.method === "POST") {
            const novoEquipamento = JSON.parse(opcoesFetch.body);
			// Gera um ID único
            novoEquipamento.id = "Equip-" + Date.now();
            equipamentos.push(novoEquipamento);

            return Promise.resolve({ ok: true, json: () => Promise.resolve(novoEquipamento) });
        }

        // Extrai o segundo segmento da URL para identificar a requisição
        const partes = url.split("/");
        const ultimoSegmento = partes[partes.length - SEGUNDO_SEGMENTO_DA_URL];

        // Simula a listagem dos equipamentos
        if (ultimoSegmento === "Equipamentos") {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamentos) });
        }

        // Simula a busca de um equipamento específico por ID
        const equipamento = equipamentos.find(e => e.id === ultimoSegmento);
        if (equipamento) {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamento) });
        }

        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    }

    return Opa5.extend("ui5.gestaoequipamento.test.integration.arrangements.Startup", {
        iStartMyApp: function (opcoesRecebidas) {
            const opcoes = opcoesRecebidas || {};

            window.fetch = mockFetch;

            this.iStartMyUIComponent({
                componentConfig: { name: "ui5.gestaoequipamento", async: true },
                hash: opcoes.hash,
                autoWait: opcoes.autoWait
            });
        }
    });
});