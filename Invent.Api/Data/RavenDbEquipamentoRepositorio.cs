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

        public async Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                equipamento.DataDeInclusao = DateTimeOffset.Now;
                await session.StoreAsync(equipamento);
                await session.SaveChangesAsync();
                return equipamento;
            }
        }

        public async Task Atualizar(string id, EquipamentoEletronico equipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var equipamentoDoBanco = await session.LoadAsync<EquipamentoEletronico>(id);

                if (equipamentoDoBanco == null)
                {
                    throw new KeyNotFoundException($"Equipamento com o ID '{id}' não foi encontrado.");
                }

                equipamentoDoBanco.Nome = equipamento.Nome;
                equipamentoDoBanco.Tipo = equipamento.Tipo;
                equipamentoDoBanco.QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque;

                await session.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos(string? filtro)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
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
        }

        public async Task<EquipamentoEletronico> ObterPorId(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                return await session.LoadAsync<EquipamentoEletronico>(id)
                    ?? throw new KeyNotFoundException($"Equipamento com o ID '{id}' não foi encontrado.");
            }
        }

        public async Task RemoverPorId(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var documentoParaRemover = await session.LoadAsync<EquipamentoEletronico>(id);

                if (documentoParaRemover == null)
                {
                    throw new KeyNotFoundException($"Equipamento com o ID '{id}' não foi encontrado.");
                }

                session.Delete(documentoParaRemover);

                await session.SaveChangesAsync();
            }
        }
    }
}