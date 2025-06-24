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

        // Criação de um equipamento
        public async Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                equipamento.Id = null; // O próprio Raven determina o Id

                equipamento.DataDeInclusao = DateTime.UtcNow;

                await session.StoreAsync(equipamento);
                await session.SaveChangesAsync();
                return equipamento;
            }
        }

        // Atualização do equipamento
        public async Task<EquipamentoEletronico?> Atualizar(EquipamentoEletronico equipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                // Carregamos o documento
                var equipamentoDoBanco = await session.LoadAsync<EquipamentoEletronico>(equipamento.Id);

                // Se o documento for nulo, retorna null
                if (equipamentoDoBanco is null)
                {
                    return null;
                }

                // Dados alterados
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

        public async Task<EquipamentoEletronico?> ObterPorId(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                return await session.LoadAsync<EquipamentoEletronico>(id);
            }
        }

        public async Task<bool> RemoverPorId(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                // Carregamos o documento
                var documentoParaRemover = await session.LoadAsync<EquipamentoEletronico>(id);

                // Se o documento for nulo, retorna false
                if (documentoParaRemover is null)
                {
                    return false;
                }

                // Se existe é removido
                session.Delete(documentoParaRemover);
                return true;
            }
        }
    }
}
