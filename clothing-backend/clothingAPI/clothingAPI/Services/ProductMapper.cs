using clothingAPI.Dto;
using clothingAPI.Models;

namespace clothingAPI.Services
{
    public static class ProductMapper
    {
        public static ProductCard ToProductCard(ProductView view)
        {
            var variants = view.Product?.ProductVariants;
            if (variants == null || !variants.Any())
                return null;

            var firstVariant = variants.First();

            return new ProductCard
            {
                Id = view.Product.Id,
                Name = view.Product.Name,
                BrandName = view.Product.Brand?.Name,
                CategoryName = view.Product.Category?.Name,
                CountViews = view.Count,
                Color = firstVariant.Color?.Name,
                Discount = firstVariant.Discount,
                Price = firstVariant.Price,
                GenderName = view.Product.GenderType?.Name,
                ImagesUrl = firstVariant.Images?.Select(i => i.Url).ToList() ?? new List<string>(),
                Sizes = firstVariant.Sizes?.Select(s => s.Size?.Name).ToList() ?? new List<string>()
            };
        }
    }

}
