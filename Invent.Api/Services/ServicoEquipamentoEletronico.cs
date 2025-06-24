using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invent.Api.Services
{
    // Implementamos a lógica e validação de negócio
    public class ServicoEquipamentoEletronico
    {
        // Dependência no repositório via interface
        private readonly IEquipamentoRepositorio _repositorioEquipamento;

        // Classe para fazer as validações das regras de negócios sobre o EquipamentoEletronico 
        private readonly IValidator<EquipamentoEletronico> _validadorEquipamentoEletronico;

        // Construtor
        public ServicoEquipamentoEletronico(IEquipamentoRepositorio repositorio, IValidator<EquipamentoEletronico> validador)
        {
            _repositorioEquipamento = repositorio;
            _validadorEquipamentoEletronico = validador;
        }

        // Criar Equipamento
        public async Task<EquipamentoEletronico> Criar(EquipamentoEletronico equipamentoParaCriar)
        {
            _validadorEquipamentoEletronico.ValidateAndThrow(equipamentoParaCriar);
            return await _repositorioEquipamento.CriarEquipamento(equipamentoParaCriar);
        }

        // Atualizar por Id
        public async Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico dadosParaAtualizar)
        {

            // Valida os dados do objeto
            _validadorEquipamentoEletronico.ValidateAndThrow(dadosParaAtualizar);

            // Registra no repositório
            return await _repositorioEquipamento.Atualizar(id, dadosParaAtualizar);
        }

        // Obter todos os equipamentos chamando o repositório
        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos()
        {
            return await _repositorioEquipamento.ObterTodos();
        }

        // Obter equipamento por id
        public async Task<EquipamentoEletronico> ObterPorId(string idDoEquipamento)
        {
            return await _repositorioEquipamento.ObterPorId(idDoEquipamento);
        }

        // Remover
        public async Task<bool> RemoverPorId(string id)
        {
            return await _repositorioEquipamento.RemoverPorId(id);
        }
    }
}