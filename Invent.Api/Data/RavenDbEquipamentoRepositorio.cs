using Invent.Api.Models;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System;
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

        // Criação de um equipamento
        public async Task<EquipamentoEletronico> CreateAsync(EquipamentoEletronico equipamento)
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

        // Atualiação do equipamento
        public async Task<EquipamentoEletronico?> UpdateAsync(EquipamentoEletronico equipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var doc = await session.LoadAsync<EquipamentoEletronico>(equipamento.Id);

                if (doc is null)
                {
                    return null; // Se não encontrou, retorna nulo.
                }

                // Atualiza os dados do objeto que veio do banco.
                doc.Nome = equipamento.Nome;
                doc.Tipo = equipamento.Tipo;
                doc.QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque;

                // Salva as alterações.
                await session.SaveChangesAsync();
                return doc;
            }
        }

        public async Task<IEnumerable<EquipamentoEletronico>> GetAllAsync()
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                return await session.Query<EquipamentoEletronico>().ToListAsync();
            }
        }

        // Busca um único equipamento pelo seu ID.
        public async Task<EquipamentoEletronico?> GetByIdAsync(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                // session.LoadAsync realiza a busca por ID
                return await session.LoadAsync<EquipamentoEletronico>(id);
            }
        }

        // Deleta um equipamento pelo ID
        public async Task<bool> DeleteAsync(string id)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                session.Delete(id);

                // Efetiva a remoção no banco.
                await session.SaveChangesAsync();
                return true;
            }
        }
    }
}
