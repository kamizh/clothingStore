namespace clothingAPI.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public int OrderId { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }
        public string Size { get; set; } = string.Empty;

        public Order Order { get; set; }
        public ProductVariant ProductVariant { get; set; }

        
    }

   

}
