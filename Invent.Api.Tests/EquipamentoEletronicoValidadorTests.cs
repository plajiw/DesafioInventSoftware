using FluentValidation;
using Invent.Api.Models;

namespace Invent.Api.Tests
{
    public class EquipamentoEletronicoValidadorTests
    {
        private readonly EquipamentoEletronicoValidador _validador = new EquipamentoEletronicoValidador();

        [Fact]
        public void Nao_Deve_Lancar_Excecao_Null_Quando_Incluir_Equipamento_Valido()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "monitor Samsung T350",
                Tipo = "Monitor",
                QuantidadeEmEstoque = 50
            };

            var excecao = Record.Exception(() => _validador.ValidateAndThrow(equipamento));

            Assert.Null(excecao);
        }

        [Fact]
        public void Deve_Falhar_Quando_Nome_Esta_Vazio()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "",
                Tipo = "Teclado",
                QuantidadeEmEstoque = 7
            };

            string erroObrigatorio = "O nome do equipamento é obrigatório.";
            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            Assert.Contains(erroObrigatorio, excecao.Message);
            Assert.Contains(erroTamanho, excecao.Message);
        }

        [Fact]
        public void Deve_Falhar_Quando_Nome_Conter_Menos_Que_Tres_Caracteres()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Ab",
                Tipo = "Teclado",
                QuantidadeEmEstoque = 7
            };

            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            Assert.Contains(erroTamanho, excecao.Message);
        }

        [Fact]
        public void Deve_Falhar_Quando_Nome_Conter_Mais_Que_Cem_Caracteres()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Tipo = "Teclado",
                QuantidadeEmEstoque = 7
            };

            string erroTamanho = "O nome deve ter entre 3 e 100 caracteres.";

            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            Assert.Contains(erroTamanho, excecao.Message);
        }

        [Fact]
        public void Deve_Falhar_Quando_Tipo_Esta_Vazio()
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Teclado Mecânico",
                Tipo = "",
                QuantidadeEmEstoque = 13
            };

            string mensagemDeErro = "O tipo do equipamento é obrigatório.";

            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            Assert.Contains(mensagemDeErro, excecao.Message);
        }

        [Theory]
        [InlineData(-10001, "A quantidade precisa ser maior ou igual a zero.")]
        [InlineData(-1, "A quantidade precisa ser maior ou igual a zero.")]
        [InlineData(10001, "A quantidade em estoque não pode exceder 10.000 unidades.")]
        [InlineData(100000, "A quantidade em estoque não pode exceder 10.000 unidades.")]
        public void Deve_Falhar_Quantidade_Em_Estoque_Invalida(int quantidadeInvalida, string mensagemDeErro)
        {
            var equipamento = new EquipamentoEletronico
            {
                Nome = "Webcam Logitech",
                Tipo = "Webcam",
                QuantidadeEmEstoque = quantidadeInvalida
            };

            var excecao = Assert.Throws<ValidationException>(() => _validador.ValidateAndThrow(equipamento));

            Assert.Contains(mensagemDeErro, excecao.Message);
        }
    }
}
