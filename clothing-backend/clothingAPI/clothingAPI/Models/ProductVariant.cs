namespace clothingAPI.Models
{
    public class ProductVariant
    {

        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Discount { get; set; }
        public int Price { get; set; }

        

        public string CareAndWashing { get; set; }

        public int ColorId { get; set; } // внешний ключ на один цвет
        public Color Color { get; set; }



        public ICollection<ProductSize> Sizes { get; set; }
        public ICollection<ProductImage> Images { get; set; }
    }
}
