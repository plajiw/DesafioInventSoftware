using Raven.Client.Documents.Session.Operations;

namespace Invent.Api
{
    public static class ClasseExtensaoTeste
    {
        public static IServiceCollection PermitirAllCors(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy => policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
            });
            
            return serviceCollection;
        }
    }
}
