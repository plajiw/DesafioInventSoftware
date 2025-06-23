using Invent.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invent.Api.Data
{
    public interface IEquipamentoRepositorio
    {
        // Adiciona um novo equipamento
        Task<EquipamentoEletronico> CreateAsync(EquipamentoEletronico equipamento);

        // Busca um equipamento pelo Id, retorna null se não existir
        Task<EquipamentoEletronico?> GetByIdAsync(string id);

        // Retorna todos os equipamentos cadastrados
        Task<IEnumerable<EquipamentoEletronico>> GetAllAsync();

        // Atualiza um equipamento existente, retorna null se não encontrar
        Task<EquipamentoEletronico?> UpdateAsync(EquipamentoEletronico equipamento);

        // Remove um equipamento pelo Id, devolve true se removeu com sucesso
        Task<bool> DeleteAsync(string id);
    }
}
