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

        // Teste 1 - Criação válida
        [Fact]
        public async Task Criar_Deve_Chamar_Repositorio_Quando_Equipamento_Valido()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Nome Teste",
                Tipo = "Tipo Teste",
                QuantidadeEmEstoque = 1001
            };

            // O mock o que ele deve retornar quando for chamado
            _mockRepositorio.Setup(repo => repo.CriarEquipamento(equipamento)).ReturnsAsync(equipamento);

            // Act
            // Chamamos o método de criação e guardamos o retorno
            var excecao = await _servico.Criar(equipamento);

            // Assert
            // Verificamos se o método não é nulo e se o repositório foi chamado uma vez
            Assert.NotNull(excecao);
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(equipamento), Times.Once());
        }

        // Teste 2 - Criação inválida, equipamento sem nome
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

            string erroObrigatorio = "O nome do equipamento é obrigatório.";
            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            // Act
            // Captura da exceção
            var excecao = await Assert.ThrowsAsync<ValidationException>(() => _servico.Criar(equipamento));

            // Assert
            Assert.Contains(erroObrigatorio, excecao.Message);
            Assert.Contains(erroTamanho, excecao.Message);

            // Verificamos que o repositório nunca foi chamado, pois validação falhou
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(It.IsAny<EquipamentoEletronico>()), Times.Never);
        }

        // Teste 3 - Testar múltiplos cenários de falha com um só método
        [Theory]
        [InlineData(-1, "A quantidade precisa ser maior ou igual a zero.")]
        [InlineData(10001, "A quantidade em estoque não pode exceder 10.000 unidades.")]
        public async Task Criar_Deve_Lancar_Excecao_Quando_QuantidadeEmEstoque_Eh_Invalida(int quantidadeEstoque, string mensagemDeErro)
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Equipamento com Estoque Inválido",
                Tipo = "Teste de Teoria",
                QuantidadeEmEstoque = quantidadeEstoque
            };

            // Act
            var excecao = await Assert.ThrowsAsync<ValidationException>(() => _servico.Criar(equipamento));

            // Assert
            Assert.Contains(mensagemDeErro, excecao.Message);
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(It.IsAny<EquipamentoEletronico>()), Times.Never);
        }

    }
}