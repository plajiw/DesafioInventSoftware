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
        public async Task<EquipamentoEletronico> CriarEquipamento(EquipamentoEletronico equipamentoParaSalvar)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                equipamentoParaSalvar.Id = null; // O próprio Raven determina o Id

                equipamentoParaSalvar.DataDeInclusao = DateTime.UtcNow;

                await session.StoreAsync(equipamentoParaSalvar);

                await session.SaveChangesAsync();

                return equipamentoParaSalvar;
            }
        }

        // Atualiação do equipamento
        public async Task<EquipamentoEletronico?> Atualizar(EquipamentoEletronico dadosDoEquipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                var equipamentoDoBanco = await session.LoadAsync<EquipamentoEletronico>(dadosDoEquipamento.Id);

                if (equipamentoDoBanco is null)
                {
                    return null; // Se não encontrou, retorna nulo.
                }

                // Atualiza os dados do objeto que veio do banco.
                equipamentoDoBanco.Nome = dadosDoEquipamento.Nome;
                equipamentoDoBanco.Tipo = dadosDoEquipamento.Tipo;
                equipamentoDoBanco.QuantidadeEmEstoque = dadosDoEquipamento.QuantidadeEmEstoque;

                // Salva as alterações.
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

        // Busca um único equipamento pelo seu ID.
        public async Task<EquipamentoEletronico?> ObterPorId(string idDoEquipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                // session.LoadAsync realiza a busca por ID
                return await session.LoadAsync<EquipamentoEletronico>(idDoEquipamento);
            }
        }

        // Deleta um equipamento pelo ID
        public async Task<bool> RemoverPorId(string idDoEquipamento)
        {
            using (IAsyncDocumentSession session = _store.OpenAsyncSession())
            {
                session.Delete(idDoEquipamento);

                // Efetiva a remoção no banco.
                await session.SaveChangesAsync();
                return true;
            }
        }
    }
}
