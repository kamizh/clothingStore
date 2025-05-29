using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class FavoriteProduct
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }
    }

}
