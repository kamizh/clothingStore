using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }

        public ICollection<AdminAct>? Acts { get; set; } = new List<AdminAct>();
    }
}
