using Invent.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invent.Api.Data
{
    // Define o "contrato" para qualquer classe que queira aceder aos dados de equipamentos.
    // Garante que todas as implementações de repositório tenham os mesmos métodos.

    public interface IEquipamentoRepositorio
    {

        // Adiciona um novo equipamento na base de dados
        Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento);


        // Atualiza um equipamento existente na base de dados
        Task<EquipamentoEletronico?> Atualizar(EquipamentoEletronico equipamento);

        // Retorna uma lista com todos os equipamentos cadastrados
        Task<IEnumerable<EquipamentoEletronico>> ObterTodos();


        // Busca um único equipamento pelo seu ID
        Task<EquipamentoEletronico?> ObterPorId(string id);


        // Remove um equipamento da base de dados pelo seu ID
        Task<bool> RemoverPorId(string id);
    }
}
