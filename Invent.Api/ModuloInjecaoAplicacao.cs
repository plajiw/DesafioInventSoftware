using FluentValidation;
using FluentValidation.AspNetCore;
using Invent.Api.Data;
using Invent.Api.Models;
using Invent.Api.Services;
using Raven.Client.Documents;

namespace Invent.Api
{
    public static class ModuloInjecaoAplicacao
    {
        public static void BindServices(IServiceCollection services)
        {
            // Registra o DocumentStore
            services.AddSingleton<IDocumentStore>(RavenDocumentStore.CriarStore());

            // Registra Repositórios e Serviços
            services.AddScoped<IEquipamentoRepositorio, RavenDbEquipamentoRepositorio>();
            services.AddScoped<ServicoEquipamentoEletronico>();

            // Registra os validadores do FluentValidation
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<EquipamentoEletronicoValidador>();
        }
    }
}