using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class Size
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductSize> ProductSizes { get; set; }
    }
}
