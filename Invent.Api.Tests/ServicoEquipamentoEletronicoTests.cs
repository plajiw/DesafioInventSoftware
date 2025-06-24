using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;
using Invent.Api.Services;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Invent.Api.Tests
{
    public class ServicoEquipamentoEletronicoTests
    {
        private readonly Mock<IEquipamentoRepositorio> _mockRepositorio;
        private readonly Mock<IValidator<EquipamentoEletronico>> _mockValidador;
        private readonly ServicoEquipamentoEletronico _servico;

        public ServicoEquipamentoEletronicoTests()
        {
            _mockRepositorio = new Mock<IEquipamentoRepositorio>();
            _mockValidador = new Mock<IValidator<EquipamentoEletronico>>();
            _servico = new ServicoEquipamentoEletronico(_mockRepositorio, _mockValidador);
        }

        [Fact]
        public async Task Criar_Deve_Chamar_Repositorio_Quando_Validacao_Passa()
        {
            // Arrange
            var equipamentoValido = new EquipamentoEletronico { Nome = "Equipamento Teste", Tipo = "Teste" };

            // Damos a instrução ao nosso mock
            _mockRepositorio.Setup(repo => repo.CriarEquipamento(equipamentoValido))
                            .ReturnsAsync(equipamentoValido);

            // Act
            var resultado = await _servico.Criar(equipamentoValido);

            // Assert
            Assert.NotNull(resultado);
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(equipamentoValido), Times.Once);
        }

        [Fact]
        public async Task Criar_Deve_Lancar_Excecao_E_Nao_Chamar_Repositorio_Quando_Validacao_Falha()
        {
            // Arrange
            var equipamentoInvalido = new EquipamentoEletronico { Nome = "" };
            _mockValidador
                .Setup(v => v.ValidateAndThrowAsync(equipamentoInvalido, default))
                .ThrowsAsync(new ValidationException("Erro simulado."));

            // Act & Assert
            await Assert.ThrowsAsync<ValidationException>(() => _servico.Criar(equipamentoInvalido));

            _mockRepositorio.Verify(repo => repo.CriarEquipamento(It.IsAny<EquipamentoEletronico>()), Times.Never);
        }
    }
}
