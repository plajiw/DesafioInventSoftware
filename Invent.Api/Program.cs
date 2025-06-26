using FluentValidation.AspNetCore;
using Invent.Api;
using Microsoft.AspNetCore.StaticFiles;
using Raven.Client.Documents;

var builder = WebApplication.CreateBuilder(args);

// 1. Serviços de aplicação e validação
ModuloInjecaoAplicacao.BindServices(builder.Services);
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddControllers();

// 2. Swagger e CORS
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

// 3. Pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

// 4. Arquivos estáticos (UI5)
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = new FileExtensionContentTypeProvider
    {
        Mappings = { [".properties"] = "application/x-msdownload" }
    }
});

app.UseStaticFiles();    // Serve wwwroot/**

// 5. Routing, CORS e Autorização
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();

// 6. Endpoints
app.MapControllers();               // API em /api/...
app.MapFallbackToFile("index.html"); // Qualquer rota não mapeada retorna index

app.Run();
