sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

    const ID_INICIAL_MOCK = 3;

    let equipamentos = [
        { id: "Equipamento-1-A", nome: "Teste 1", tipo: "Eletrônico", quantidadeEmEstoque: 10, dataDeInclusao: "2025-07-08T13:39:38.1443059Z", temEstoque: true },
        { id: "Equipamento-2-A", nome: "Teste 2", tipo: "Mecânico", quantidadeEmEstoque: 0, dataDeInclusao: "2025-07-08T13:39:38.1443059Z", temEstoque: false }
    ];
    let proximoId = ID_INICIAL_MOCK;

    function mockFetch(url, opcoesFetch) {
        if (opcoesFetch?.method === "POST") {
            const novoEquipamento = JSON.parse(opcoesFetch.body);
            novoEquipamento.id = `Equipamento-${proximoId++}-A`;
            equipamentos.push(novoEquipamento);
            return Promise.resolve({ ok: true, json: () => Promise.resolve(novoEquipamento) });
        }

        if (url.endsWith("/Equipamentos")) {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamentos) });
        }

        const id = url.split("/").pop();
        const equipamento = equipamentos.find(e => e.id === id);
        return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamento) });
    }

    return Opa5.extend("ui5.gestaoequipamento.test.integration.arrangements.Startup", {
        iStartMyApp: function (opcoes = {}) {
            window.fetch = mockFetch;
            this.iStartMyUIComponent({
                componentConfig: { name: "ui5.gestaoequipamento", async: true },
                hash: opcoes.hash,
                autoWait: true
            });
        },

        iTearDownMyApp: function () {
            window.fetch = undefined;
            equipamentos = [
                { id: "Equipamento-1-A", nome: "Teste 1", tipo: "Eletrônico", quantidadeEmEstoque: 10, dataDeInclusao: "2025-07-08T13:39:38.1443059Z", temEstoque: true },
                { id: "Equipamento-2-A", nome: "Teste 2", tipo: "Mecânico", quantidadeEmEstoque: 0, dataDeInclusao: "2025-07-08T13:39:38.1443059Z", temEstoque: false }
            ];
            proximoId = ID_INICIAL_MOCK;
            return this.iTeardownMyUIComponent();
        }
    });
});