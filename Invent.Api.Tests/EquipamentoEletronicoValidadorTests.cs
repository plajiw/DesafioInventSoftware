using FluentValidation;
using Invent.Api.Models;

namespace Invent.Api.Tests
{
    // Os testes precisam cobrir a menor unidade do propriedade
    public class EquipamentoEletronicoValidadorTests
    {
        // Instanciamos a classe de validação do FluentValidation
        private readonly EquipamentoEletronicoValidador _validador = new EquipamentoEletronicoValidador();


        // Incluir no service private readonly IValidator<EquipamentoEletronico> _validadorEquipamento;

        [Fact]
        public void Nao_Deve_Lancar_Excecao_Null_Quando_Incluir_Equipamento_Valido()
        {
            // Arrange (Organizar)
            var equipamento = new EquipamentoEletronico
            {
                Nome = "monitor Samsung T350",
                Tipo = "Monitor",
                QuantidadeEmEstoque = 50
            };

            // Act (Agir)
            // Validar e lançar exceção, se houver
            var excecao = Record.Exception(() => _validador.ValidateAndThrow(equipamento));

            // Assert (Afirmar)
            Assert.Null(excecao);
        }

        [Fact]
        public void Deve_Falhar_Quando_Nome_Esta_Vazio()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "",
                Tipo = "Teclado",
                QuantidadeEmEstoque = 7
            };

            string erroObrigatorio = "O nome do equipamento é obrigatório.";
            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            // Act
            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            // Assert
            Assert.Contains(erroObrigatorio, excecao.Message);
            Assert.Contains(erroTamanho, excecao.Message);
        }

        [Fact]
        public void Deve_Falhar_Quando_Nome_Estiver_Menor_Que_Tres_Caracteres()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Ab",
                Tipo = "Teclado",
                QuantidadeEmEstoque = 7
            };

            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            // Act
            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            // Assert
            Assert.Contains(erroTamanho, excecao.Message);
        }

        [Fact]
        public void Deve_Falhar_Quando_Nome_Estiver_Null()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = null,
                Tipo = "Teclado",
                QuantidadeEmEstoque = 7
            };

            string mensagemDeErro = "O nome do equipamento não pode ser nulo.";

            // Act
            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            // Assert
            Assert.Contains(mensagemDeErro, excecao.Message);
        }

        [Fact]
        public void Deve_Falhar_Quando_Tipo_Esta_Vazio()
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Teclado Mecânico",
                Tipo = "",
                QuantidadeEmEstoque = 13
            };

            string mensagemDeErro = "O tipo do equipamento é obrigatório.";

            // Act
            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            // Assert
            Assert.Contains(mensagemDeErro, excecao.Message);
        }

        [Theory]
        [InlineData(-1, "A quantidade precisa ser maior ou igual a zero.")]
        [InlineData(10001, "A quantidade em estoque não pode exceder 10.000 unidades.")]
        public void Deve_Falhar_Quantidade_Em_Estoque_Invalida(int quantidadeInvalida, string mensagemDeErro)
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Webcam Logitech",
                Tipo = "Webcam",
                QuantidadeEmEstoque = quantidadeInvalida
            };

            // Act
            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            // Assert
            Assert.Contains(mensagemDeErro, excecao.Message);
        }
    }
}
