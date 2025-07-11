using Invent.Api.Models;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Invent.Api.Data
{
    public class RavenDbEquipamentoRepositorio : IEquipamentoRepositorio
    {
        private readonly IDocumentStore _store;

        public RavenDbEquipamentoRepositorio(IDocumentStore store)
        {
            _store = store;
        }

        private IAsyncDocumentSession AbrirSessao()
        {
            return _store.OpenAsyncSession();
        }

        public async Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento)
        {
            using var session = AbrirSessao();
            equipamento.DataDeInclusao = DateTimeOffset.Now;
            await session.StoreAsync(equipamento);
            await session.SaveChangesAsync();
            return equipamento;
        }

        public async Task Atualizar(string id, EquipamentoEletronico equipamento)
        {
            using var session = AbrirSessao();
            var equipamentoExistente = await session.LoadAsync<EquipamentoEletronico>(id);

            if (equipamentoExistente == null)
            {
                throw new KeyNotFoundException($"Equipamento com ID '{id}' não encontrado.");
            }

            equipamentoExistente.Nome = equipamento.Nome;
            equipamentoExistente.Tipo = equipamento.Tipo;
            equipamentoExistente.QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque;

            await session.SaveChangesAsync();
        }

        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos(string? filtro)
        {
            using var session = AbrirSessao();
            var query = session.Query<EquipamentoEletronico>();

            if (!string.IsNullOrEmpty(filtro))
            {
                query = query
                    .Search(x => x.Nome, $"*{filtro}*")
                    .Search(x => x.Tipo, $"*{filtro}*")
                    .Search(x => x.QuantidadeEmEstoque, $"*{filtro}*");
            }

            return await query.ToListAsync();
        }

        public async Task<EquipamentoEletronico> ObterPorId(string id)
        {
            using var session = AbrirSessao();
            var equipamento = await session.LoadAsync<EquipamentoEletronico>(id);
            return equipamento ?? throw new KeyNotFoundException($"Equipamento com ID '{id}' não encontrado.");
        }

        public async Task RemoverPorId(string id)
        {
            using var session = AbrirSessao();
            var equipamento = await session.LoadAsync<EquipamentoEletronico>(id);

            if (equipamento == null)
            {
                throw new KeyNotFoundException($"Equipamento com ID '{id}' não encontrado.");
            }

            session.Delete(equipamento);
            await session.SaveChangesAsync();
        }
    }
}