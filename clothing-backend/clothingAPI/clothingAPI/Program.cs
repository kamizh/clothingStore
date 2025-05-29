using clothingAPI.Data;
using clothingAPI.Repository;
using clothingAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer; 



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<GenerateJWTToken>();


builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var cfg = builder.Configuration;
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            // провер€ем подпись
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(cfg["Jwt:SecretKey"])),

            // провер€ем издател€
            ValidateIssuer = true,
            ValidIssuer = cfg["Jwt:Issuer"],

            // провер€ем получател€
            ValidateAudience = true,
            ValidAudience = cfg["Jwt:Audience"],

            // провер€ем срок действи€
            ValidateLifetime = true,
        };
    });

builder.WebHost.UseUrls("http://0.0.0.0:80");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Clothing API", Version = "v1" });
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins(
            "http://localhost:5173", // дл€ dev (Vite)
            "http://localhost:3000"  // дл€ продакшена в Docker
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddAuthorization(); 


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ProductRepository>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
var app = builder.Build();
app.UseCors("AllowFrontend");  
app.Use(async (context, next) =>
{
    Console.WriteLine($"[Request] {context.Request.Method} {context.Request.Path}");
    await next();
});


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}


app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Clothing API V1");
    c.RoutePrefix = "swagger";
});

app.MapControllers();
app.MapGet("/", () => "Hello World!");
app.Run();
