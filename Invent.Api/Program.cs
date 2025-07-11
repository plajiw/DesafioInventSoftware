﻿using FluentValidation.AspNetCore;
using Invent.Api;
using Microsoft.AspNetCore.StaticFiles;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

ModuloInjecaoAplicacao.BindServices(builder.Services);

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddControllers();
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

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = new FileExtensionContentTypeProvider
    {
        Mappings = { [".properties"] = "application/x-msdownload" }
    }
});

app.UseStaticFiles();

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

if (app.Environment.IsDevelopment())
{
    app.MapGet("/tests", context =>
    {
        context.Response.Redirect("/test/integration/opaTests.qunit.html");
        return Task.CompletedTask;
    });
}

app.Run();
