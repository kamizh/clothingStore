using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class ProductSize
    {
        [Key]
        public int Id { get; set; } // проще

        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }

        public int SizeId { get; set; }
        public Size Size { get; set; }

        public int Quantity { get; set; }

      

    }
}
