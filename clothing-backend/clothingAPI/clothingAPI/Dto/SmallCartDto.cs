namespace clothingAPI.Dto
{
    public class SmallCartDto
    {
        public int ProductVariantId { get; set; }
        public int UserId { get; set; }
        public string CurrentSize { get; set; } = string.Empty;
    }
}
