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
                equipamento.Id = null;
                equipamento.DataDeInclusao = DateTime.UtcNow;

                await session.StoreAsync(equipamento);
                await session.SaveChangesAsync();
                return equipamento;
            }
        }

        public async Task<EquipamentoEletronico> Atualizar(string id, EquipamentoEletronico equipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var equipamentoDoBanco = await session.LoadAsync<EquipamentoEletronico>(id);

                if (equipamentoDoBanco is null)
                {
                    throw new KeyNotFoundException($"Equipamento com o ID '{id}' não foi encontrado.");
                }

                equipamentoDoBanco.Nome = equipamento.Nome;
                equipamentoDoBanco.Tipo = equipamento.Tipo;
                equipamentoDoBanco.QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque;

                await session.SaveChangesAsync();
                return equipamentoDoBanco;
            }
        }

        public async Task<IEnumerable<EquipamentoEletronico>> ObterTodos()
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                return await session.Query<EquipamentoEletronico>().ToListAsync();
            }
        }

        public async Task<EquipamentoEletronico> ObterPorId(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var equipamento = await session.LoadAsync<EquipamentoEletronico>(id);

                if (equipamento is null)
                {
                    throw new KeyNotFoundException($"Equipamento com o ID '{id}' não foi encontrado.");
                }

                return equipamento;
            }
        }

        public async Task<bool> RemoverPorId(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var documentoParaRemover = await session.LoadAsync<EquipamentoEletronico>(id);

                if (documentoParaRemover is null)
                {
                    return false;
                }

                session.Delete(documentoParaRemover);

                await session.SaveChangesAsync();

                return true;
            }
        }
    }
}
