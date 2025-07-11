using Invent.Api.Models;
using Raven.Client.Documents.Session;

namespace Invent.Api.Data
{
    public interface IEquipamentoRepositorio
    {
        Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento);
        Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico equipamento);
        Task<IEnumerable<EquipamentoEletronico>> ObterTodos(string? filtro);
        Task<EquipamentoEletronico> ObterPorId(string id, IAsyncDocumentSession session = null);
        Task RemoverPorId(string id);
    }
}