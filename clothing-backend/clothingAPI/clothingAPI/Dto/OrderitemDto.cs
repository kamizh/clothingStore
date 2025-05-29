namespace clothingAPI.Dto
{
    public class OrderitemDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public int Count { get; set; }
        public decimal Discount { get; set; }
        public decimal Price { get; set; }
    }
}
