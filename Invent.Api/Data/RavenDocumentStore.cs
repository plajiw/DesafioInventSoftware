using Raven.Client.Documents;

namespace Invent.Api.Data
{
    // Classe estática para centralizar a criação do DocumentStore
    public static class RavenDocumentStore
    {
        public static IDocumentStore CriarStore()
        {
            var store = new DocumentStore
            {
                Urls = new[] { "http://127.0.0.1:8080" },
                Database = "InventSoftwareDB"
            };

            // Altera o separador padrão
            store.Conventions.IdentityPartsSeparator = '-';

            store.Initialize();
            return store;
        }
    }
}
