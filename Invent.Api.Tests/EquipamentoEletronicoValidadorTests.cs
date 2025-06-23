using FluentValidation;
using Invent.Api.Models;
using Xunit;

namespace Invent.Api.Tests
{
    public class EquipamentoEletronicoValidadorTests
    {
        private readonly EquipamentoEletronicoValidador _validador = new EquipamentoEletronicoValidador();
        private readonly IValidator<EquipamentoEletronico> _validadorEquipamento;

        [Fact]
        public void Deve_Validar_Com_Sucesso_Equipamento_Valido()
        {
            // Arrange (Organizar)
            var equipamento = new EquipamentoEletronico
            {
                Nome = "monitor Samsung T350",
                Tipo = "Monitor",
                QuantidadeEmEstoque = 50
            };

            // Act (Agir)
            var resultado = _validador.Validate(equipamento);

            // Assert (Afirmar)
            Assert.True(resultado.IsValid);
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

            // Act
            var resultado = _validador.Validate(equipamento);

            // _validador.ValidateAndThrow(equipamento);

            // Assert
            Assert.False(resultado.IsValid);

            const string mensagemDeErro = "O nome do equipamento é obrigatório.\r\nO nome deve ter entre 3 e 100 caracteres.";
            Assert.Equal(mensagemDeErro, resultado.ToString());
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

            // Act
            var resultado = _validador.Validate(equipamento);

            // Assert
            Assert.False(resultado.IsValid);
            Assert.Contains(resultado.Errors, erro => erro.PropertyName == "Tipo");
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(10001)]
        public void Deve_Falhar_Quantidade_Em_Estoque_Invalida(int quantidadeInvalida)
        {
            // Arrange
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Webcam Logitech",
                Tipo = "Webcam",
                QuantidadeEmEstoque = quantidadeInvalida
            };

            // Act
            var resultado = _validador.Validate(equipamento);

            // Assert
            Assert.False(resultado.IsValid);
            Assert.Contains(resultado.Errors, erro => erro.PropertyName == "");
        }
    }
}
