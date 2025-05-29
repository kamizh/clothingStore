namespace clothingAPI.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductVariantId { get; set; }
        public string Size { get; set; } = string.Empty;
        public int Count { get; set; }
        public User User { get; set; }
        public ProductVariant ProductVariant { get; set; }

    }
}
