// Selecionar elementos do DOM
const form = document.getElementById('equipamento-form');
const nomeInput = document.getElementById('nome');
const tipoInput = document.getElementById('tipo');
const quantidadeInput = document.getElementById('quantidade');
const dataCadastroInput = document.getElementById('data-cadastro');
const tableBody = document.getElementById('table-body');
const noDataMessage = document.getElementById('no-data-message');

// URL da API
const apiUrl = 'http://localhost:5124/api/equipamentos';

// Função para buscar e renderizar equipamentos
function buscarEquipamentos() {
    noDataMessage.classList.add('d-none');
    tableBody.innerHTML = '';

    fetch(apiUrl)
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro ao buscar equipamentos');
            return resposta.json();
        })
        .then(equipamentos => {
            if (equipamentos.length === 0) {
                noDataMessage.classList.remove('d-none');
            } else {
                renderTable(equipamentos);
            }
        })
        .catch(erro => {
            noDataMessage.textContent = 'Falha ao carregar dados. Verifique o backend.';
            noDataMessage.classList.remove('d-none');
            alert('Erro: ' + erro.message);
        });
}

// Função para renderizar a tabela
function renderTable(equipamentos) {
    tableBody.innerHTML = '';
    equipamentos.forEach(equipamento => {
        const dataFormatada = new Date(equipamento.dataDeInclusao).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${equipamento.nome}</td>
            <td>${equipamento.tipo}</td>
            <td>${equipamento.quantidadeEmEstoque}</td>
            <td>${dataFormatada}</td>
            <td>${equipamento.quantidadeEmEstoque > 0 ? 'Sim' : 'Não'}</td>
            <td class="text-end"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Evento de submit do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const dados = {
        nome: nomeInput.value.trim(),
        tipo: tipoInput.value.trim(),
        quantidadeEmEstoque: parseInt(quantidadeInput.value)
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro ao salvar equipamento');
            return resposta.json();
        })
        .then(() => {
            form.reset();
            buscarEquipamentos();
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
});

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', buscarEquipamentos);