using FluentValidation;
using Invent.Api.Models;
using System;
using System.Collections.Generic;

namespace Invent.Api.Models
{
    public class EquipamentoEletronicoValidador : AbstractValidator<EquipamentoEletronico>
    {
        public EquipamentoEletronicoValidador()
        {
            // RuleFor(e => e.Id)
            //    .NotEmpty().WithMessage("O ID é obrigatório para operações de atualização.");

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
