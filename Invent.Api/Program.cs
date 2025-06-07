using Invent.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IEquipamentoRepository, InMemoryEquipamentoRepository>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();