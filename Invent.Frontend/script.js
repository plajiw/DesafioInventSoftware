const form = document.getElementById('equipamento-form');
const formTitle = document.getElementById('form-title');
const equipamentoIdInput = document.getElementById('equipamento-id');
const nomeInput = document.getElementById('nome');
const tipoInput = document.getElementById('tipo');
const quantidadeInput = document.getElementById('quantidade');
const dataCadastroInput = document.getElementById('data-cadastro');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const tableBody = document.getElementById('table-body');
const noDataMessage = document.getElementById('no-data-message');

const apiUrl = 'http://localhost:5124/api/equipamentos';

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
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-1" onclick="prepararParaEditar('${equipamento.id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deletarEquipamento('${equipamento.id}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function prepararParaEditar(id) {
    fetch(`${apiUrl}/${id}`)
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro ao buscar equipamento');
            return resposta.json();
        })
        .then(equipamento => {
            formTitle.textContent = 'Editar Equipamento';
            equipamentoIdInput.value = equipamento.id;
            nomeInput.value = equipamento.nome;
            tipoInput.value = equipamento.tipo;
            quantidadeInput.value = equipamento.quantidadeEmEstoque;
            dataCadastroInput.value = new Date(equipamento.dataDeInclusao).toISOString().split('T')[0];
            submitBtn.textContent = 'Atualizar';
            cancelBtn.classList.remove('d-none');
            form.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
}

function deletarEquipamento(id) {
    if (confirm('Tem certeza que deseja excluir este equipamento?')) {
        fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
            .then(resposta => {
                if (!resposta.ok) throw new Error('Erro ao excluir equipamento');
                buscarEquipamentos();
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
    }
}

function limparFormulario() {
    form.reset();
    equipamentoIdInput.value = '';
    formTitle.textContent = 'Adicionar Novo Equipamento';
    submitBtn.textContent = 'Salvar';
    cancelBtn.classList.add('d-none');
    nomeInput.focus();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = equipamentoIdInput.value;
    const isEditing = id !== '';

    const dados = {
        id: id || undefined,
        nome: nomeInput.value.trim(),
        tipo: tipoInput.value.trim(),
        quantidadeEmEstoque: parseInt(quantidadeInput.value),
        dataDeInclusao: isEditing ? dataCadastroInput.value : undefined
    };

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro ao salvar equipamento');
            return resposta.json();
        })
        .then(() => {
            limparFormulario();
            buscarEquipamentos();
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
});

cancelBtn.addEventListener('click', limparFormulario);

document.addEventListener('DOMContentLoaded', buscarEquipamentos);