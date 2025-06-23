using FluentValidation;
using FluentValidation.AspNetCore;
using Invent.Api.Data;
using Invent.Api.Models;
using Raven.Client.Documents;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()  // Permite requisições de qualquer origem
               .AllowAnyMethod()  // Permite qualquer método HTTP (GET, POST, PUT, DELETE)
               .AllowAnyHeader(); // Permite que a requisição tenha qualquer cabeçalho
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IDocumentStore>(provider =>
{
    var store = new DocumentStore
    {
        // Porta para o RavenDB
        Urls = new[] { "http://127.0.0.1:8080" }, 
        
        Database = "InventSoftwareDB"             
    };

    // Alterar o separador padrão do Raven
    store.Conventions.IdentityPartsSeparator = '-';

    store.Initialize();

    return store;
});

builder.Services.AddScoped<IEquipamentoRepositorio, RavenDbEquipamentoRepositorio>();

// Registro do FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<EquipamentoEletronicoValidador>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();