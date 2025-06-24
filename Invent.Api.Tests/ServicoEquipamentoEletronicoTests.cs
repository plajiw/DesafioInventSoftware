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

        // Teste 1
        [Fact]
        public async Task Criar_Deve_Chamar_Repositorio_Quando_Equipamento_Eh_Valido()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Notebook Gamer",
                Tipo = "Eletrônico",
                QuantidadeEmEstoque = 5
            };

            // "salva" no banco de dados e retornar de forma assíncrona
            _mockRepositorio.Setup(repo => repo.CriarEquipamento(equipamento)).ReturnsAsync(equipamento);

            // Act
            var resultado = await _servico.Criar(equipamento);

            // Assert
            Assert.NotNull(resultado);

            // verifica se o método foi chamado uma vez e chamado o objeto equipamento
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(equipamento), Times.Once);
        }

        [Fact]
        public async Task Atualizar_Equipamento_Deve_Chamar_Repos
    }
}