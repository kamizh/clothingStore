namespace clothingAPI.Models
{
    public class AdminAct
    {
        public int Id { get; set; }
        public string Action {  get; set; }

        public int AdminId { get; set; }
        public Admin Admin { get; set; }
    }
}
