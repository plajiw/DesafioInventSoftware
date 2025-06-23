using FluentValidation;

namespace Invent.Api.Models
{
    public class EquipamentoEletronicoValidador : AbstractValidator<EquipamentoEletronico>
    {
        public EquipamentoEletronicoValidador()
        {
            RuleFor(e => e.Nome).NotEmpty().WithMessage("O nome é obrigatório")
            .Length(1, 100).WithMessage("O nome deve estar entre 1 a 100 caractéres.");

            RuleFor(e => e.Tipo).NotEmpty().WithMessage("O tipo é obrigatório.")
            .Length(1, 50).WithMessage("O tipo deve conter de 1 a 50 caractéres.");

            RuleFor(e => e.QuantidadeEmEstoque).GreaterThan(0).WithMessage("A quantidade deve ser maior que zero.");
        }
    }
}
