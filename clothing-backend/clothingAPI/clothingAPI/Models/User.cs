using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        
        public int BonusCount { get; set; }
        public bool IsLocked { get; set; } = false;
        public DateTime DataRegistration {  get; set; }
        public string? NumberPhone { get; set; }
        public string? Name { get; set; }
        public string? SurName {  get; set; }
        public DateTime? Date {  get; set; }
        

        public ICollection<FavoriteProduct> FavoriteProducts { get; set; }
        public ICollection<Adress> Adresses { get; set; }
    }
}
