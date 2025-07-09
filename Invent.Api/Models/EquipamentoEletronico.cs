namespace Invent.Api.Models
{
    public class EquipamentoEletronico
    {
        public string? Id { get; set; }
        public required string Nome { get; set; }
        public required string Tipo { get; set; }
        public int QuantidadeEmEstoque { get; set; }
        public DateTime DataDeInclusao { get; set; }
        public bool TemEstoque => QuantidadeEmEstoque > 0;
    }
}