using FluentValidation;

namespace Invent.Api.Models
{
    public class EquipamentoEletronicoValidador : AbstractValidator<EquipamentoEletronico>
    {
        // Essas validações se aplicam para a classe EquipamentoEletronico
        // Esta classe inteira existe com o único propósito de validar objetos do tipo EquipamentoEletronico
        public EquipamentoEletronicoValidador()
        {
            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("O nome do equipamento é obrigatório.")
                .Length(3, 100).WithMessage("O nome deve ter entre 3 e 100 caracteres.");

            RuleFor(e => e.Tipo)
                .NotEmpty().WithMessage("O tipo do equipamento é obrigatório.");

            RuleFor(e => e.QuantidadeEmEstoque)
                .GreaterThanOrEqualTo(0).WithMessage("A quantidade precisa ser maior ou igual a zero.")
                .LessThanOrEqualTo(10000).WithMessage("A quantidade em estoque não pode exceder 10.000 unidades.");
        }
    }
}
