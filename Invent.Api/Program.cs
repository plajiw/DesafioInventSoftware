using Invent.Api.Data;

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

// Registro do repositório
builder.Services.AddSingleton<IEquipamentoRepository, InMemoryEquipamentoRepository>();


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