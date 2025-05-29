namespace clothingAPI.Dto
{
    public class UserDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Surname { get; set; }

        public string Email { get; set; }

        public List<string> Adresses { get; set; }

        public string? BirthDay { get; set; }
        public int BonusCount { get; set; }

    }
}
