//Scaffold-DbContext "Host=localhost;Port=5432;Database=mind_earth;Username=postgres;Password=Admin@1234" Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Entity -force

using Microsoft.Extensions.FileProviders;
using MindEarth.Web.Extension;

namespace MindEarth.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            //service registration
            builder.Services.AddApplication();

            //fluent migrator
            builder.Services.AddApplicationWithConfiguration(builder.Configuration);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(builder.Environment.ContentRootPath, "uploaddata")),
                RequestPath = "/uploaddata" // The URL path to access the files (e.g., /StaticFiles/image.png)
            });


            app.UseAuthentication();
            app.UseAuthorization();



            app.MapControllers();
            app.Migrate();
            app.Run();
        }
    }
}
