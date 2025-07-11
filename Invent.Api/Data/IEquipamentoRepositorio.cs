using Invent.Api.Models;

namespace Invent.Api.Data
{
    public interface IEquipamentoRepositorio
    {
        Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento);
        Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico equipamento);
        Task<IEnumerable<EquipamentoEletronico>> ObterTodos(string? filtro);
        Task<EquipamentoEletronico> ObterPorId(string id);
        Task RemoverPorId(string id);
    }
}