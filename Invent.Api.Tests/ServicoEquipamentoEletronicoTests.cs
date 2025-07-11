using FluentValidation;
using Invent.Api.Data;
using Invent.Api.Models;
using Invent.Api.Services;
using Moq;

namespace Invent.Api.Tests
{
    public class ServicoEquipamentoEletronicoTests
    {
        private readonly Mock<IEquipamentoRepositorio> _mockRepositorio;
        private readonly IValidator<EquipamentoEletronico> _validador;
        private readonly ServicoEquipamentoEletronico _servico;

        public ServicoEquipamentoEletronicoTests()
        {
            _mockRepositorio = new Mock<IEquipamentoRepositorio>();
            _validador = new EquipamentoEletronicoValidador();

            _servico = new ServicoEquipamentoEletronico(_mockRepositorio.Object, _validador);
        }

        [Fact]
        public async Task Criar_Deve_Chamar_Repositorio_Quando_Equipamento_Valido()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Nome Teste",
                Tipo = "Tipo Teste",
                QuantidadeEmEstoque = 1001
            };

            _mockRepositorio.Setup(repo => repo.CriarEquipamento(equipamento)).ReturnsAsync(equipamento);

            var excecao = await _servico.Criar(equipamento);

            Assert.NotNull(excecao);
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(equipamento), Times.Once());
        }

        [Fact]
        public async Task Criar_Deve_Lancar_Excecao_Quando_Equipamento_Invalido()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "",
                Tipo = "Teste",
                QuantidadeEmEstoque = 1000
            };

            string erroObrigatorio = "O nome do equipamento é obrigatório.";
            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            var excecao = await Assert.ThrowsAsync<ValidationException>(() => _servico.Criar(equipamento));

            Assert.Contains(erroObrigatorio, excecao.Message);
            Assert.Contains(erroTamanho, excecao.Message);

            _mockRepositorio.Verify(repo => repo.CriarEquipamento(It.IsAny<EquipamentoEletronico>()), Times.Never);
        }

        [Theory]
        [InlineData(-1, "A quantidade precisa ser maior ou igual a zero.")]
        [InlineData(10001, "A quantidade em estoque não pode exceder 10.000 unidades.")]
        public async Task Criar_Deve_Lancar_Excecao_Quando_QuantidadeEmEstoque_Eh_Invalida(int quantidadeEstoque, string mensagemDeErro)
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Equipamento com Estoque Inválido",
                Tipo = "Teste de Teoria",
                QuantidadeEmEstoque = quantidadeEstoque
            };

            var excecao = await Assert.ThrowsAsync<ValidationException>(() => _servico.Criar(equipamento));

            Assert.Contains(mensagemDeErro, excecao.Message);
            _mockRepositorio.Verify(repo => repo.CriarEquipamento(It.IsAny<EquipamentoEletronico>()), Times.Never);
        }

    }
}