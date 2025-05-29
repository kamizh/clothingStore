using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace adminPanel.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public int BonusCount { get; set; }
        public bool IsLocked { get; set; } = false;
        public DateTime DataRegistration { get; set; }
        public string NumberPhone { get; set; }
        public string  Name { get; set; }
        public string  SurName { get; set; }
        public DateTime? Date { get; set; }


        public ICollection<FavoriteProduct> FavoriteProducts { get; set; }
        public ICollection<Adress> Adresses { get; set; }
    }


    public class FavoriteProduct
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }
    }
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Article { get; set; }

        public string Compound { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int GenderTypeId { get; set; }
        public GenderType GenderType { get; set; }

        public ICollection<ProductVariant> ProductVariants { get; set; }

    }
    public class SimpleProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Article { get; set; }
        public string BrandName { get; set; }
        public string Compound { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public string GenderName { get; set; }
    }

    public class Adress
    {

        public int Id { get; set; }
        public int UserId { get; set; }

        public string City { get; set; }
        public string Street { get; set; }
        public string House { get; set; }
        public string Apartament { get; set; }

        public User user { get; set; }
    }
    public class GenderType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }

    public class Size
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductSize> ProductSizes { get; set; }
    }

    public class ProductVariant
    {

        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Discount { get; set; }
        public int Price { get; set; }



        public string CareAndWashing { get; set; }

        public ICollection<Color> Colors { get; set; }

        public ICollection<ProductSize> Sizes { get; set; }
        public ICollection<ProductImage> Images { get; set; }
    }

    public class ProductSize
    {
        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }

        public int SizeId { get; set; }
        public Size Size { get; set; }

        public int Quantity { get; set; }


    }

    public class ProductImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool isMain { get; set; }
        public int ProductVariantId { get; set; }

        public ProductVariant ProductVariant { get; set; }


    }

    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductVariant> ProductVariants { get; set; } // Связь с вариантами товара

    }
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }



        public ICollection<Product> Products { get; set; }
    }

    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Country { get; set; }



        public ICollection<Product> Products { get; set; } = new List<Product>();
    }


    public class Admin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public ICollection<AdminAct> Acts { get; set; } = new List<AdminAct>();
    }

    public class AdminAct
    {
        public int Id { get; set; }
        public string Action { get; set; }

        public int AdminId { get; set; }
        public Admin Admin { get; set; }
    }
    class GeneralData
    {
        public int countUsers { get; set; }
        public int countProduct { get; set; }
        public int countBrands { get; set; }
        public int countCategories { get; set; }
        public int? countOrders { get; set; }
    }

    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Article { get; set; }
        public string Compound { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public string GenderType { get; set; }
        public List<ProductVariantDto> Variants { get; set; }
    }

    public class ProductVariantDto
    {
        public int Id { get; set; }
        public int Discount { get; set; }
        public int Price { get; set; }
        public string CareAndWashing { get; set; }
        public string Color { get; set; }
        public List<string> Images { get; set; }
        public List<string> Sizes { get; set; }
    }

    public class ProductVariantDtoPost
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public int Discount { get; set; }
        public int Price { get; set; }
        public string CareAndWashing { get; set; }
        public string Color { get; set; }
        public List<string> Images { get; set; }
        public List<string> Sizes { get; set; }
    }



    public class CloudImage
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
    }

}
