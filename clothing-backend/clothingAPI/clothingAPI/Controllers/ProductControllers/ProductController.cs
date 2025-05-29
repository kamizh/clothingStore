using clothingAPI.Data;
using clothingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using clothingAPI.Dto;
using Microsoft.EntityFrameworkCore;
using static clothingAPI.Controllers.AdminControllers.AdminController;
using clothingAPI.Services;
using clothingAPI.Repository;

namespace clothingAPI.Controllers.ProductControllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : Controller
    {

        private readonly ApplicationDbContext _context;

        private readonly ProductRepository _productRepository;

        public ProductController(ApplicationDbContext dpData, ProductRepository productRepository)
        {
            _context = dpData;
            _productRepository = productRepository;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularProducts()
        {
            var productViews = await _context.ProductViews
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.ProductVariants)
                        .ThenInclude(pv => pv.Images)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.ProductVariants)
                        .ThenInclude(pv => pv.Sizes)
                            .ThenInclude(ps => ps.Size)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.ProductVariants)
                        .ThenInclude(pv => pv.Color)
                .Include(p => p.Product)
                    .ThenInclude(b => b.Brand)
                .Include(p => p.Product)
                    .ThenInclude(b => b.Category)
                .Include(p => p.Product)
                    .ThenInclude(b => b.GenderType)
                .OrderByDescending(pv => pv.Count)
                .Take(20)
                .ToListAsync();


            var products = productViews
                    .Select(ProductMapper.ToProductCard)
                    .Where(p => p != null)
                    .ToList();


            if (products.Any())
                return Ok(new { products });

            return NotFound("Популярные товары не найдены.");
        }
        [HttpGet("allProducts")]
        public async Task<IActionResult> GetAllProducts()
        {

            var productViews = await _context.ProductViews
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.ProductVariants)
                        .ThenInclude(pv => pv.Images)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.ProductVariants)
                        .ThenInclude(pv => pv.Sizes)
                            .ThenInclude(ps => ps.Size)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.ProductVariants)
                        .ThenInclude(pv => pv.Color)
                .Include(p => p.Product)
                    .ThenInclude(b => b.Brand)
                .Include(p => p.Product)
                    .ThenInclude(b => b.Category)
                .Include(p => p.Product)
                    .ThenInclude(b => b.GenderType)
                .OrderByDescending(pv => pv.Count)
                .ToListAsync();


            var products = productViews
                   .Select(ProductMapper.ToProductCard)
                   .Where(p => p != null)
                   .ToList();


            if (products == null)
                return NotFound();

            return Ok(products);
        }


        [HttpGet("women")]
        public async Task<IActionResult> GetWomen()
        {
            var productsViews = await _productRepository.Women();

            if (productsViews == null) 
                return NotFound();

            List<ProductCard> products = productsViews.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();

            if(products == null)
                return NotFound();

            return Ok(products);
        }

        [HttpGet("men")]
        public async Task<IActionResult> GetMen()
        {
            var productView = await _productRepository.Men();

            if(productView == null)
                return NotFound();

            List<ProductCard> products = productView.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();

            if( products == null)
                return NotFound();

            return Ok(products);

        }

        [HttpGet("category/{type}")]
        public async Task<IActionResult> GetCategoryClothes(string type)
        {

            type = TypeCategporyFormat.Format(type);

            if(type  == null) 
                return NotFound();

            var productViews =  await _productRepository.Category(type);

            if (productViews == null)
                return NotFound();

            List<ProductCard> products = productViews.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();

            if(products == null)
                return NotFound();

            return Ok(products);
        }

        [HttpGet("women/category/{type}")]
        public async Task<IActionResult> GetWomenCategory(string type)
        {
            type = TypeCategporyFormat.Format(type);

            if (type == null)
                return NotFound();

            var productViewsGender = await _productRepository.Women();

            var productFormatCategory = productViewsGender.Where(p => p.Product.Category.Name == type).ToList();

            if (productFormatCategory == null)
                return NotFound();

            List<ProductCard> products = productFormatCategory.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();
        
            if(products == null)
                return NotFound();

            return Ok(products);
        }

        [HttpGet("men/category/{type}")]
        public async Task<IActionResult> GetMenCategory(string type)
        {
            type = TypeCategporyFormat.Format(type);

            if (type == null)
                return NotFound();

            var productViewsGender = await _productRepository.Men();

            var productFormatCategory = productViewsGender.Where(p => p.Product.Category.Name == type).ToList();

            if (productFormatCategory == null)
                return NotFound();

            List<ProductCard> products = productFormatCategory.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();

            if (products == null)
                return NotFound();

            return Ok(products);
        }

        [HttpGet("brand/{brand}")]
        public async Task<IActionResult> GetBrandClothes(string brand)
        {
            brand = TypeBrandFormat.Format(brand);

            if (brand == null) 
                return NotFound();

            var productViews = await _productRepository.Brand(brand);

            if (productViews == null)
                return NotFound();

            List<ProductCard> products = productViews.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();

            return Ok(products);
        }

        [HttpGet("men/brand/{brand}")]
        public async Task<IActionResult> GetBrandFromMen(string brand)
        {
            brand = TypeBrandFormat.Format(brand);

            if (brand == null)
                return NotFound();

            var productViews = await _productRepository.Brand(brand);

            var productViewsGender = productViews.Where(p => p.Product.GenderTypeId == 1).ToList();

            List<ProductCard> products = productViewsGender.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList(); 

            return Ok(products);

        }

        [HttpGet("women/brand/{brand}")]
        public async Task<IActionResult> GetBrandFromWomen(string brand)
        {
            brand = TypeBrandFormat.Format(brand);

            if (brand == null)
                return NotFound();

            var productViews = await _productRepository.Brand(brand);

            var productViewsGender = productViews.Where(p => p.Product.GenderTypeId == 2).ToList();

            List<ProductCard> products = productViewsGender.Select(ProductMapper.ToProductCard).Where(p => p != null).ToList();

            return Ok(products);

        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetProductDetail(int id)
        {

            var currentProduct = await _context.Products
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

            if (currentProduct == null)
                return NotFound();

            var dto = new ProductDto
            {
                Id = currentProduct.Id,
                Name = currentProduct.Name,
                Description = currentProduct.Description,
                Article = currentProduct.Article,
                Compound = currentProduct.Compound,
                Brand = currentProduct.Brand?.Name,
                Category = currentProduct.Category?.Name,
                GenderType = currentProduct.GenderType?.Name,
                Variants = currentProduct.ProductVariants.Select(variant => new ProductVariantDto
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




            if (currentProduct != null)
            {
                var currentPorudctView = await _context.ProductViews.FirstOrDefaultAsync(p => p.ProductId == id);

                if (currentPorudctView != null)
                    currentPorudctView.Count++;

                
                await _context.SaveChangesAsync();

                return Ok(new { dto });
            }

            return BadRequest();

        }

        [HttpGet("favorite/{id}")]
        public async Task<IActionResult> GetFavoriteProducts(int id)
        {
            var favoriteProducts = await _context.FavoriteProducts
                .Where(f => f.UserId == id)
                .ToListAsync();

            var variantIds = favoriteProducts.Select(f => f.ProductVariantId).ToList();

            var productVariants = await _context.ProductVariants
                .Where(v => variantIds.Contains(v.Id))
                .Include(v => v.Product).ThenInclude(p => p.Brand)
                .Include(v => v.Product).ThenInclude(p => p.Category)
                .Include(v => v.Product).ThenInclude(p => p.GenderType)
                .Include(v => v.Images)
                .Include(v => v.Sizes).ThenInclude(s => s.Size)
                .Include(v => v.Color)
                .ToListAsync();

            var productCards = productVariants.Select(variant => new ProductCard
            {
                Id = variant.ProductId,
                Discount = variant.Discount,
                BrandName = variant.Product.Brand.Name,
                CategoryName = variant.Product.Category.Name,
                Color = variant.Color.Name,
                CountViews = 0,
                GenderName = variant.Product.GenderType.Name,
                ImagesUrl = variant.Images.Select(img => img.Url).ToList(),
                Name = variant.Product.Name,
                Price = variant.Price,
                Sizes = variant.Sizes.Select(s => s.Size.Name).ToList()
            }).ToList();

            return Ok(productCards);
        }


        [HttpPost("favorite/add")]
        public async Task<IActionResult> AddFavoriteProduct([FromBody] FavoriteDto favorite)
        {
            var currentProductVariant = await _context.ProductVariants.FindAsync(favorite.ProductVariantId);
            var currentUser = await _context.Users.FindAsync(favorite.UserId);

            if (currentProductVariant == null || currentUser == null)
                return NotFound();

            var isAlreadyFavorite = await _context.FavoriteProducts
                .AnyAsync(f => f.UserId == favorite.UserId && f.ProductVariantId == favorite.ProductVariantId);

            if (isAlreadyFavorite)
                return BadRequest(new { answer = false, message = "Уже добавлено в избранное" });

            var favoriteNew = new FavoriteProduct
            {
                ProductVariantId = favorite.ProductVariantId,
                UserId = favorite.UserId
            };

            await _context.FavoriteProducts.AddAsync(favoriteNew);
            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpDelete("favorite/delete")]
        public async Task<IActionResult> DeleteFavoriteProduct([FromBody] FavoriteDto favorite)
        {
            var currentFavorite = await _context.FavoriteProducts.FirstOrDefaultAsync(f => f.UserId == favorite.UserId && f.ProductVariantId == favorite.ProductVariantId);

            if (currentFavorite == null)
                return NotFound();

             _context.FavoriteProducts.Remove(currentFavorite);

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpPost("favorite/find")]
        public async Task<IActionResult> FindFavoriteProduct([FromBody] FavoriteDto favorite)
        {
            var currentFavorite = await _context.FavoriteProducts.FirstOrDefaultAsync(f => f.UserId == favorite.UserId && f.ProductVariantId == favorite.ProductVariantId);

            if (currentFavorite == null)
                return Ok(new { answer = false });

            return Ok(new {answer  = true});
        }


    }
}
