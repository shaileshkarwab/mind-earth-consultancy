using AutoMapper;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using MindEarth.Database.Entity;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.Auth.DTO;
using MindEarth.Web.Features.Reports.ReportService;
using MindEarth.Web.Features.Services;
using System.Reflection;
using System.Text;

namespace MindEarth.Web.Extension
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(cfg =>
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));


            services.AddScoped<TokenService>();
            services.AddScoped<IUserCommonService, UserCommonService>();
            services.AddScoped<IExistenceChecker, ExistenceChecker>();
            services.AddScoped<IGenericIDService, GenericIDService>();
            services.AddScoped<IReportExcelService, ReportExcelService>();
            services.AddSingleton<IConfigParamService, ConfigParamService>();
            services.AddHttpContextAccessor();
            return services;
        }


        public static IServiceCollection AddApplicationWithConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            //fluent migrator
            var connectionString = configuration.GetSection("ConnectionStrings:DefaultDB").Get<string>();

            services
            .AddLogging(c => c.AddFluentMigratorConsole())
            .AddFluentMigratorCore()
            .ConfigureRunner(c => c
            .AddPostgres()
            .WithGlobalConnectionString(connectionString)
            .ScanIn(Assembly.GetExecutingAssembly()).For.All());

            //adding db context
            services.AddDbContext<MindEarthContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });


            //bind JWT
            services.Configure<JWTModel>(configuration.GetSection("JWT"));


            //allow cors
            //adding cors
            var allowOrigins = configuration.GetSection("AppSettings:AllowOrigins").Get<string[]>();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy
                        .WithOrigins(allowOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithExposedHeaders("X-PAGINATION");
                });
            });


            //jwt binder
            services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],

                    IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
                };
            });


            return services;
        }


        public static IApplicationBuilder Migrate(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var runner = scope.ServiceProvider.GetService<IMigrationRunner>();
            runner.ListMigrations();
            runner.MigrateUp();
            return app;
        }
    }
}
