using clothingAPI.Data;
using clothingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace clothingAPI.Repository
{
    public class ProductRepository
    {

        private readonly ApplicationDbContext _context;

        public  ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<List<ProductView>> GetProductViews()
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
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Brand)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Category)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.GenderType)
                .OrderByDescending(pv => pv.Count)
                .ToListAsync();

            return productViews;
        }

        public async Task<List<ProductView>> Women()
        {

            var productViews = await this.GetProductViews();

            var products = productViews.Where(p => p.Product.GenderTypeId == 2).ToList();

            return products;
        }
        public async Task<List<ProductView>> Men()
        {

            var productViews = await this.GetProductViews();

            var products = productViews.Where(p => p.Product.GenderTypeId == 1).ToList();

            return products;
        }

        public async Task<List<ProductView>> Category(string type)
        {

            var productViews = await this.GetProductViews();

            var products = productViews.Where(p => p.Product.Category.Name == type).ToList();

            return products;

        }

        public async Task<List<ProductView>> Brand(string brand)
        {
            var productViews = await this.GetProductViews();

            var products = productViews.Where(p => p.Product.Brand.Name == brand).ToList();

            return products;
        }








    }
}
