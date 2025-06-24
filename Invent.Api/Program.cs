using FluentValidation;
using FluentValidation.AspNetCore;
using Invent.Api.Data;
using Invent.Api.Models;
using Invent.Api.Services;
using Raven.Client.Documents;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IDocumentStore>(provider =>
{
    var store = new DocumentStore
    {
        Urls = new[] { "http://127.0.0.1:8080" },
        Database = "InventSoftwareDB"
    };
    store.Conventions.IdentityPartsSeparator = '-';
    store.Initialize();
    return store;
});

builder.Services.AddScoped<IEquipamentoRepositorio, RavenDbEquipamentoRepositorio>();

builder.Services.AddScoped<ServicoEquipamentoEletronico>();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<EquipamentoEletronicoValidador>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();