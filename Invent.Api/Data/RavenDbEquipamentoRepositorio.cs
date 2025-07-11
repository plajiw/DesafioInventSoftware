using Invent.Api.Models;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

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

        public async Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico equipamento)
        {
            using var session = AbrirSessao();
            var equipamentoExistente = await ObterPorId(id, session);

            equipamentoExistente.Nome = equipamento.Nome;
            equipamentoExistente.Tipo = equipamento.Tipo;
            equipamentoExistente.QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque;

            await session.SaveChangesAsync();
            return equipamentoExistente;
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

        public async Task<EquipamentoEletronico> ObterPorId(string id, IAsyncDocumentSession session = null)
        {
            session ??= AbrirSessao();

            return await session.LoadAsync<EquipamentoEletronico>(id) ?? throw new KeyNotFoundException($"Equipamento com ID '{id}' não encontrado.");
        }

        public async Task RemoverPorId(string id)
        {
            using var session = AbrirSessao();
            var equipamento = await ObterPorId(id, session);
            session.Delete(equipamento);
            await session.SaveChangesAsync();
        }
    }
}