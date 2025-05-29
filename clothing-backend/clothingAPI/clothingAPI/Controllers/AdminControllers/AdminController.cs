using clothingAPI.Models;
using clothingAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace clothingAPI.Controllers.AdminControllers
{
   [ApiController]
    [Route("api/admin")]
    public class AdminController : Controller
    {

        private readonly CloudinaryService _cloudinary = new CloudinaryService();
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getAllProduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            var products = await _context.Products
                .Select(p => new SimpleProduct
                {
                    Id = p.Id,
                    Name = p.Name,
                    BrandName = p.Brand.Name,
                    CategoryName = p.Category.Name,
                    GenderName = p.GenderType.Name,
                    Article = p.Article,
                    Compound = p.Compound,
                    Description = p.Description
                    
                })
                .ToListAsync();


            return Ok(new { products });
        }


        [HttpPost("productAdd")]
        public async Task<IActionResult> AddProduct(SimpleProduct product)
        {
            if (product == null)
                return NotFound();

            Product productNew = new Product
            {
                Name = product.Name,
                Article = product.Article,
                Description = product.Description,
                Compound = product.Compound,
                BrandId = _context.Brands.First(p => p.Name == product.BrandName).Id,
                CategoryId = _context.Categories.First(p => p.Name == product.CategoryName).Id,
                GenderTypeId = product.GenderName == "Мужской" ? 1 : 2,

            };

            var productView = new ProductView { Count = 0, Product = productNew, ProductId = productNew.Id };

            _context.ProductViews.Add(productView);

            
            
             _context.Add(productNew);
            await _context.SaveChangesAsync();
            return Ok(new { answer = true });
            
           
        }
        [HttpPut("putProduct")]
        public async Task<IActionResult> PutProduct(SimpleProduct product)
        {
            if (product == null)
                return NotFound();

            Product tempProduct = _context.Products.First(p => p.Id == product.Id);

            tempProduct.Name = product.Name;
            tempProduct.Article = product.Article;
            tempProduct.Description = product.Description;
            tempProduct.Compound = product.Compound;
            tempProduct.BrandId = _context.Brands.First(p => p.Name == product.BrandName).Id;
            tempProduct.CategoryId = _context.Categories.First(p => p.Name == product.CategoryName).Id;
            tempProduct.GenderTypeId = product.GenderName == "Мужской" ? 1 : 2;

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });

        }

        [HttpPut("putVariant")]
        public async Task<IActionResult> PutVariant(ProductVariantDto variant)
        {
            if (variant == null)
                return NotFound();

            var currentVariant = await _context.ProductVariants
                .Include(p => p.Sizes)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == variant.Id);

            if (currentVariant == null)
                return NotFound();

            currentVariant.Price = variant.Price;
            currentVariant.Discount = variant.Discount;
            currentVariant.CareAndWashing = variant.CareAndWashing;

            currentVariant.Color = await _context.Colors.FirstOrDefaultAsync(p => p.Name == variant.Color);

            if (currentVariant.Color == null)
                return BadRequest("Цвет не найден");

            _context.ProductSizes.RemoveRange(currentVariant.Sizes);

            var productSizes = new List<ProductSize>();
            foreach (var item in variant.Sizes)
            {
                var size = await _context.Sizes.FirstOrDefaultAsync(p => p.Name == item);
                if (size == null) continue;

                productSizes.Add(new ProductSize
                {
                    ProductVariant = currentVariant,
                    ProductVariantId = currentVariant.Id,
                    Size = size,
                    SizeId = size.Id,
                    Quantity = 100
                });
            }

            currentVariant.Sizes = productSizes;

            _context.ProductImages.RemoveRange(currentVariant.Images);

            var images = new List<ProductImage>();
            for (int i = 0; i < variant.Images.Count; i++)
            {
                images.Add(new ProductImage
                {
                    isMain = i == 0,
                    ProductVariant = currentVariant,
                    ProductVariantId = currentVariant.Id,
                    Url = variant.Images[i]
                });
            }

            currentVariant.Images = images;

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpPost("postVariant")]
        public async Task<IActionResult> PostVariant(ProductVariantDtoPost variant)
        {

            if (variant == null)
                return NotFound();

            Product currentProduct = await _context.Products.Include(p => p.ProductVariants).FirstOrDefaultAsync(p => p.Id == variant.ProductId);

            if (currentProduct == null)
                return BadRequest();

            var currentColor = await _context.Colors.FirstOrDefaultAsync(p => p.Name == variant.Color);

            ProductVariant currentVariant = new ProductVariant
            {
                Price = variant.Price,
                Discount = variant.Discount,
                CareAndWashing = variant.CareAndWashing,
                Color = currentColor,
                ProductId = currentProduct.Id,
                Product = currentProduct,
                ColorId = currentColor.Id,

            };

            List<ProductSize> sizes = new List<ProductSize>();

            foreach(var item in variant.Sizes)
            {


                var size = _context.Sizes.FirstOrDefault(p => p.Name == item);

                var productSize = new ProductSize
                {
                    ProductVariant = currentVariant,
                    ProductVariantId = currentVariant.Id,
                    Quantity = 15,
                    Size = size,
                    SizeId = size.Id,
                };

                sizes.Add(productSize);

            }

            currentVariant.Sizes = sizes;

            List<ProductImage> images = new List<ProductImage>();

            for(int i = 0;i < variant.Images.Count;i++)
            {

                var productImage = new ProductImage
                {
                    isMain = i == 0 ? true : false,
                    ProductVariant = currentVariant,
                    ProductVariantId = currentVariant.Id,
                    Url = variant.Images[i],
                };

                images.Add(productImage);


            }

            currentVariant.Images = images;

            currentProduct.ProductVariants.Add(currentVariant);

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });


        }



        [HttpGet("colors")]
        public async Task<IActionResult> GetColors()
        {
            var colors = await _context.Colors.Select(color => color.Name).ToListAsync();

            return Ok(new {colors });
        }

        [HttpDelete("product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products
            .Include(p => p.ProductVariants)
                .ThenInclude(v => v.Images)
            .Include(p => p.ProductVariants)
                .ThenInclude(v => v.Sizes)
            .FirstOrDefaultAsync(p => p.Id == id);

            if(product != null)
            {
                foreach(var variant in product.ProductVariants)
                {
                    if (variant.Images != null)
                        _context.ProductImages.RemoveRange(variant.Images);

                    if (variant.Sizes != null)
                        _context.ProductSizes.RemoveRange(variant.Sizes);

                }
                if(product.ProductVariants != null)
                    _context.ProductVariants.RemoveRange(product.ProductVariants);
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();


                return Ok(new {answer = true});
            }

            return NotFound();
        }


        [HttpGet("getProductvariants/{id}")]
        public async Task<IActionResult> GetProductVariants(int id)
        {
            var product = await _context.Products
            .Where(p => p.Id == id)
            .Include(p => p.Brand)
            .Include(p => p.Category)
            .Include(p => p.GenderType)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Images)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Sizes)
                    .ThenInclude(ps => ps.Size)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Color)
            .FirstOrDefaultAsync();

            if (product == null)
                return NotFound();

            var dto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Article = product.Article,
                Compound = product.Compound,
                Brand = product.Brand?.Name,
                Category = product.Category?.Name,
                GenderType = product.GenderType?.Name,
                Variants = product.ProductVariants.Select(variant => new ProductVariantDto
                {
                    Id = variant.Id,
                    Price = variant.Price,
                    Discount = variant.Discount,
                    CareAndWashing = variant.CareAndWashing,
                    Color = variant.Color?.Name,
                    Images = variant.Images?.Select(img => img.Url).ToList() ?? new List<string>(),
                    Sizes = variant.Sizes?.Select(s => s.Size?.Name).ToList() ?? new List<string>()
                }).ToList()
            };

            return Ok(dto);

        }

        [HttpDelete("deleteProductVariant/{id}")]
        public async Task<IActionResult> DeleteProductVariant(int id)
        {

            try
            {
                var variant = await _context.ProductVariants.Include(p => p.Images).Include(p => p.Sizes).FirstOrDefaultAsync(p => p.Id == id);

                if (variant.Images != null)
                {

                    foreach(var image in variant.Images)
                    {
                        await _cloudinary.DeleteImageAsync(image.Url);
                    }

                    _context.ProductImages.RemoveRange(variant.Images);
                }

                if (variant.Sizes != null)
                    _context.ProductSizes.RemoveRange(variant.Sizes);

                _context.ProductVariants.Remove(variant);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при удаление варианта");

                return NotFound();
            }

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });



        }



        [HttpGet("getAllBrands")]
        public async Task< IActionResult> getAllBrands()
        {
            var brands = await _context.Brands.ToListAsync();
            return Ok(new {brands});
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO admin)
        {
            Console.WriteLine($"Login: {admin.Login}, Password: {admin.Password}");
            if (admin == null || admin.Login.Length == 0 || admin.Password.Length == 0)
                return Ok(new { answer = false });

            Admin current = _context.Admins.FirstOrDefault(p => p.Login == admin.Login);
            
            if(current == null)
                return Ok(new { answer = false });


            if (VerifyPassword(admin.Password, current.Password))
            {
                
                return Ok(new { answer = true, admin = current });

            }
            return Ok(new {answer = false });
        }
        [HttpGet("category")]
        public async Task<IActionResult> Category()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(new { categories });
        }
        [HttpGet("general")]
        public async Task<IActionResult> GetGeneral()
        {
            var general = new GeneralData
            {
                countUsers = _context.Users.ToList().Count,
                countBrands = _context.Brands.ToList().Count,
                countCategories = _context.Categories.ToList().Count,
                countProduct = _context.Products.ToList().Count,
                countOrders = _context.Orders.ToList().Count,
            };
            return Ok(new { general });
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
        [HttpGet("getBrands")]
        public async Task<IActionResult> GetBrands()
        {
            var brands = await _context.Brands.ToListAsync();
            return Ok(new { brands });
        }



        [HttpDelete("deleteBrand/{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            if(id > 0)
            {
                var brands = await _context.Brands.ToListAsync();
                var deleteBrand = brands.Where(p => p.Id == id).FirstOrDefault();
                if(deleteBrand != null)
                {
                    _context.Brands.Remove(deleteBrand);
                    await _context.SaveChangesAsync();
                    return Ok(new { answer = true });
                }
            }
            return BadRequest();
        }

        [HttpPost("addBrand")]
        public async Task<IActionResult> AddBrand(BrandDTO brand)
        {
            if(brand != null)
            {
                var newBrand = new Brand
                {
                    Name = brand.Name,
                    Country = brand.Country,
                };
                await _context.Brands.AddAsync(newBrand);
                await _context.SaveChangesAsync();
                return Ok(new { answer = true });
            }
            return BadRequest();
        }

        private bool VerifyPassword(string enteredPassword, string storedPasswordHash)
        {
            return HashPassword(enteredPassword) == storedPasswordHash;
        }

        [HttpGet("getUsers")]
        public IActionResult getAllUsers()
        {
            var users = _context.Users.ToListAsync();
            return Ok(new { users });
        }
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            if(id > 0)
            {
                var users = await _context.Users.ToListAsync();
                User deleteUser = new User();
                foreach (var user in users)
                    if (user.Id == id)
                    {
                        deleteUser = user;
                        break;
                    }
                if(deleteUser != null)
                {
                    _context.Users.Remove(deleteUser);
                    await _context.SaveChangesAsync();
                    return Ok(new { answer = true });
                }
            }
            return BadRequest();
        }

        [HttpPut("userChange")]
        public async Task<IActionResult> ChangeUser([FromBody] UserDto user)
        {
            Console.WriteLine(">>> ChangeUser invoked");

            if (!ModelState.IsValid)
            {
                Console.WriteLine(">>> ModelState is invalid");
                foreach (var kvp in ModelState)
                {
                    Console.WriteLine($"  {kvp.Key}: {string.Join(", ", kvp.Value.Errors.Select(e => e.ErrorMessage))}");
                }
                return BadRequest(ModelState);
            }

            
            Console.WriteLine($">>> Received user with ID: {user.Id}");

            var userToUpdate = await _context.Users.FindAsync(user.Id);
            if (userToUpdate == null)
            {
                return NotFound();
            }

            userToUpdate.Name = user.Name;
            userToUpdate.SurName = user.SurName;
            userToUpdate.Email = user.Email;
            userToUpdate.IsLocked = user.IsLocked;
            userToUpdate.BonusCount = user.BonusCount;
            userToUpdate.DataRegistration = user.DataRegistration;
            userToUpdate.Date = user.Date;
            userToUpdate.NumberPhone = user.NumberPhone;

            await _context.SaveChangesAsync();
            return Ok(new { answer = true });
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



        public class BrandDTO
        {
            public string Name { get; set; }
            public string Country { get; set; }
        }
        public class UserDto
        {
            public int Id { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public int BonusCount { get; set; }
            public bool IsLocked { get; set; }
            public DateTime DataRegistration { get; set; }
            public string NumberPhone { get; set; }
            public string Name { get; set; }
            public string SurName { get; set; }
            public DateTime? Date { get; set; }
        }

        public class LoginDTO
        {
            public string Login { get; set; }
            public string Password { get; set; }
        }

        class GeneralData
        {
            public int countUsers { get; set; }
            public int countProduct { get; set; }
            public int countBrands { get; set; }
            public int countCategories { get; set; }
            public int? countOrders { get; set; }
        }

    }
}
