using clothingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace clothingAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FavoriteProduct>()
                .HasKey(fp => new { fp.UserId, fp.ProductVariantId });
            modelBuilder.Entity<Product>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<FavoriteProduct> FavoriteProducts { get; set; }
        public DbSet<Adress> Adresses { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<GenderType> GenderTypes { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }

        public DbSet<ProductView> ProductViews { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<AdminAct> AdminActs { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
    }
}