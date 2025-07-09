using Invent.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invent.Api.Data
{
    public interface IEquipamentoRepositorio
    {

        Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento);

        Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico equipamento);

        Task<IEnumerable<EquipamentoEletronico>> ObterTodos();

        Task<EquipamentoEletronico> ObterPorId(string id);

        Task<bool> RemoverPorId(string id);
    }
}
