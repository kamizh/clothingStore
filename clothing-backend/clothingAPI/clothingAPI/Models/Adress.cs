using System.ComponentModel.DataAnnotations;

namespace clothingAPI.Models
{
    public class Adress
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }

        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string House { get; set; }
        [Required]
        public string Apartament { get; set; }


        public User user { get; set; }
    }
}
