using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class Color
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } 

        public ICollection<ProductVariant> ProductVariants { get; set; }

    }
}
