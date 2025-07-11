using FluentValidation;
using FluentValidation.AspNetCore;
using Invent.Api.Data;
using Invent.Api.Models;
using Invent.Api.Services;
using Raven.Client.Documents;
using System.Text.Json.Serialization;

namespace Invent.Api
{
    public static class ModuloInjecaoAplicacao
    {
        public static void BindServices(IServiceCollection services)
        {
            services.AddSingleton<IDocumentStore>(RavenDocumentStore.CriarStore());

            services.AddScoped<IEquipamentoRepositorio, RavenDbEquipamentoRepositorio>();
            services.AddScoped<ServicoEquipamentoEletronico>();

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<EquipamentoEletronicoValidador>();
        }
    }
}