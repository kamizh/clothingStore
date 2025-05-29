using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class ProductImage
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public bool isMain { get; set; }
        [Required]
        public int ProductVariantId { get; set; }

        public ProductVariant ProductVariant{ get; set; }


    }
}
