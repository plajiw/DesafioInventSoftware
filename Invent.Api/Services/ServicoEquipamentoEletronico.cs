using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Invent.Api.Services
{
    // Implementamos a lógica de negócio
    public class ServicoEquipamentoEletronico
    {
        private readonly IEquipamentoRepositorio _repositorio;

        // Classe para fazer as validações das regras de negócios
        private readonly IValidator<EquipamentoEletronico> _validador;

        // Construtor
        public ServicoEquipamentoEletronico(IEquipamentoRepositorio repositorio, IValidator<EquipamentoEletronico> validador)
        {
            _repositorio = repositorio;
            _validador = validador;
        }


        // Criar Equipamento
        public async Task<EquipamentoEletronico> Criar(EquipamentoEletronico equipamentoParaCriar)
        {
            // Validação dos dados
            _validador.ValidateAndThrow(equipamentoParaCriar);

            return await _repositorio.CriarEquipamento(equipamentoParaCriar);
        }

        // Atualizar por Id
        public async Task<EquipamentoEletronico?> Atualizar(string idDoEquipamento, EquipamentoEletronico dadosParaAtualizar)
        {
            // Validar se o Id existe
            if (idDoEquipamento != dadosParaAtualizar.Id)
            {
                throw new FluentValidation.ValidationException("O Id da rota não corresponde ao ID no corpo da requisição.");
            }

            // Valida os dados do objeto
            _validador.ValidateAndThrow(dadosParaAtualizar);

            // Registra no repositório
            return await _repositorio.Atualizar(dadosParaAtualizar);
        }

        // Obter todos os equipamentos chamando o repositório
        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos()
        {
            return await _repositorio.ObterTodos();
        }

        // Obter equipamento por id
        public async Task<EquipamentoEletronico?> ObterPorId(string idDoEquipamento)
        {
            return await _repositorio.ObterPorId(idDoEquipamento);
        }

        // Remover
        public async Task<bool> RemoverPorId(string id)
        {
            return await _repositorio.RemoverPorId(id);
        }


    }
}
