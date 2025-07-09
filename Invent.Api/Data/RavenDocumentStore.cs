using Raven.Client.Documents;

namespace Invent.Api.Data
{
    public static class RavenDocumentStore
    {
        public static IDocumentStore CriarStore()
        {
            var store = new DocumentStore
            {
                Urls = new[] { "http://127.0.0.1:8080" },
                Database = "InventSoftwareDB"
            };

            store.Conventions.IdentityPartsSeparator = '-';

            store.Initialize();
            return store;
        }
    }
}
