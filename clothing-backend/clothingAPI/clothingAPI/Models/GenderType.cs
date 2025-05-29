namespace clothingAPI.Models
{
    public class GenderType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
