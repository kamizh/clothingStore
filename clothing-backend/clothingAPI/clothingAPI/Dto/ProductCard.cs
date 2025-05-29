using clothingAPI.Data;
using clothingAPI.Models;

namespace clothingAPI.Dto
{
    public class ProductCard
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Discount { get; set; }

        public int Price { get; set; }
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
        public string Color { get; set; }
        public string GenderName { get; set; }

        public int CountViews { get; set; }
        public List<string> ImagesUrl { get; set; }
        public List<string> Sizes {  get; set; }


    }
}
