using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public string Country {  get; set; }



        public ICollection<Product> Products { get; set; }
    }
}
