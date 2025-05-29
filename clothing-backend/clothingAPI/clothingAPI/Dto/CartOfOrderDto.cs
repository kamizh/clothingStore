namespace clothingAPI.Dto
{
    public class CartOfOrderDto
    {
        public int UserId { get; set; }
        public List<int> CartItems { get; set; }
        public string Phone { get; set; }
        public decimal Price { get; set; }
    }
}
