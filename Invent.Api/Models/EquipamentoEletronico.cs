using System.ComponentModel.DataAnnotations;

namespace Invent.Api.Models
{
    public class EquipamentoEletronico
    {
        // Identificador global
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        public required string Nome { get; set; }

        [Required(ErrorMessage = "Informe o tipo do equipamento")]
        public required string Tipo { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "A quantidade precisa ser maior ou igual a zero")]
        public int QuantidadeEmEstoque { get; set; }

        // Data de cadastrado do equipamento
        public DateTime DataDeInclusao { get; set; }

        // Retorna true se ainda houver estoque disponível
        public bool TemEstoque => QuantidadeEmEstoque > 0;

    }
}
