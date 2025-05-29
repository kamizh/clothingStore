namespace clothingAPI.Models
{
    public class ProductView
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public Product Product { get; set; }
    }
}
