using Invent.Api.Models;
using System.Collections.Concurrent; // Pode remover este using agora

namespace Invent.Api.Data
{
    public class InMemoryEquipamentoRepository : IEquipamentoRepository
    {
        private static readonly Dictionary<Guid, EquipamentoEletronico> _equipamentos = new();

        public Task<EquipamentoEletronico> CreateAsync(EquipamentoEletronico equipamento)
        {
            equipamento.Id = Guid.NewGuid();
            equipamento.DataDeInclusao = DateTime.UtcNow;

            _equipamentos[equipamento.Id] = equipamento;

            return Task.FromResult(equipamento);
        }

        public Task<IEnumerable<EquipamentoEletronico>> GetAllAsync()
        {
            return Task.FromResult(_equipamentos.Values.AsEnumerable());
        }

        public Task<EquipamentoEletronico?> GetByIdAsync(Guid id)
        {
            _equipamentos.TryGetValue(id, out var equipamento);
            return Task.FromResult(equipamento);
        }

        public Task<EquipamentoEletronico?> UpdateAsync(EquipamentoEletronico equipamento)
        {
            if (!_equipamentos.ContainsKey(equipamento.Id))
                return Task.FromResult<EquipamentoEletronico?>(null);

            _equipamentos[equipamento.Id] = equipamento;
            return Task.FromResult<EquipamentoEletronico?>(equipamento);
        }

        public Task<bool> DeleteAsync(Guid id)
        {
            var removed = _equipamentos.Remove(id);
            return Task.FromResult(removed);
        }
    }
}