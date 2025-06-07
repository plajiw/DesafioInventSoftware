using Invent.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registro do repositório e controllers
builder.Services.AddSingleton<IEquipamentoRepository, InMemoryEquipamentoRepository>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
