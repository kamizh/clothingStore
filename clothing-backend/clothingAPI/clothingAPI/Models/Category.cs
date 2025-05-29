using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }



        public ICollection<Product> Products { get; set; }
    }
}
