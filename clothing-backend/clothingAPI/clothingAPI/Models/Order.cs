namespace clothingAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DateRegistration { get; set; }
        public decimal Price { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public User User { get; set; }
        public ICollection<OrderItem> Items { get; set;}
    }
}
