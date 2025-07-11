using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;

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
            await _validadorEquipamentoEletronico.ValidateAndThrowAsync(equipamentoParaCriar);
            return await _repositorioEquipamento.CriarEquipamento(equipamentoParaCriar);
        }

        public async Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico dadosParaAtualizar)
        {
            await _validadorEquipamentoEletronico.ValidateAndThrowAsync(dadosParaAtualizar);
            return await _repositorioEquipamento.Atualizar(id, dadosParaAtualizar);
        }

        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos(string? filtro)
        {
            return await _repositorioEquipamento.ObterTodos(filtro);
        }

        public async Task<EquipamentoEletronico> ObterPorId(string idDoEquipamento)
        {
            return await _repositorioEquipamento.ObterPorId(idDoEquipamento);
        }

        public async Task RemoverPorId(string id)
        {
            await _repositorioEquipamento.RemoverPorId(id);
        }
    }
}