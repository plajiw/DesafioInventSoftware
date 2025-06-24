using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;
using Invent.Api.Services;
using Moq;

namespace Invent.Api.Tests
{
    public class ServicoEquipamentoEletronicoTests
    {
        // classe ServicoEquipamentoEletronico precisa de um repositório e validador para salvar os dados
        private readonly Mock<IEquipamentoRepositorio> _mockRepositorio;
        private readonly IValidator<EquipamentoEletronico> _validador;
        private readonly ServicoEquipamentoEletronico _servico; // Objeto testado

        // Construtor
        public ServicoEquipamentoEletronicoTests()
        {
            _mockRepositorio = new Mock<IEquipamentoRepositorio>(); // Instancia do repositorio
            _validador = new EquipamentoEletronicoValidador(); // Instancia do validador

            _servico = new ServicoEquipamentoEletronico(_mockRepositorio.Object, _validador);
        }

        // Criação inválida, equipamento sem nome
        [Fact]
        public async Task Criar_Deve_Lancar_Excecao_Quando_Equipamento_Invalido()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "",
                Tipo = "Teste",
                QuantidadeEmEstoque = 1000
            };

            // Act
            await Assert.ThrowsAsync<ValidationException>(() => _servico.Criar(equipamento));

            // Assert
            // Verificamos que o repositório nunca foi chamado, pois validação falhou
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(It.IsAny<EquipamentoEletronico>()), Times.Never);
        }
    }
}