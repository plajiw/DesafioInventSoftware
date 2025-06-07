using Invent.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IEquipamentoRepository, InMemoryEquipamentoRepository>();

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.Run();
