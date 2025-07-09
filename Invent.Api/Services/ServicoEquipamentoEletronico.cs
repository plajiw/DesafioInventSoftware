using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invent.Api.Services
{
    public class ServicoEquipamentoEletronico
    {
        private readonly IEquipamentoRepositorio _repositorioEquipamento;

        private readonly IValidator<EquipamentoEletronico> _validadorEquipamentoEletronico;

        public ServicoEquipamentoEletronico(IEquipamentoRepositorio repositorio, IValidator<EquipamentoEletronico> validador)
        {
            _repositorioEquipamento = repositorio;
            _validadorEquipamentoEletronico = validador;
        }

        public async Task<EquipamentoEletronico> Criar(EquipamentoEletronico equipamentoParaCriar)
        {
            _validadorEquipamentoEletronico.ValidateAndThrow(equipamentoParaCriar);
            return await _repositorioEquipamento.CriarEquipamento(equipamentoParaCriar);
        }

        public async Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico dadosParaAtualizar)
        {

            _validadorEquipamentoEletronico.ValidateAndThrow(dadosParaAtualizar);

            return await _repositorioEquipamento.Atualizar(id, dadosParaAtualizar);
        }

        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos()
        {
            return await _repositorioEquipamento.ObterTodos();
        }

        public async Task<EquipamentoEletronico> ObterPorId(string idDoEquipamento)
        {
            return await _repositorioEquipamento.ObterPorId(idDoEquipamento);
        }

        public async Task<bool> RemoverPorId(string id)
        {
            return await _repositorioEquipamento.RemoverPorId(id);
        }
    }
}