namespace clothingAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Article {  get; set; }
        
        public string Compound { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int GenderTypeId { get; set; }
        public GenderType GenderType { get; set; }

        public ICollection<ProductVariant> ProductVariants { get; set; }
        
    }
}
