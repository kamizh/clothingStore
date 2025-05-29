namespace clothingAPI.Services
{
    public static class TypeCategporyFormat
    {
        private static Dictionary<string, string> keyValuePairs = new Dictionary<string, string>
        {
            {"tshirts","Футболка" },
            {"hoodies","Худи" },
            {"longsleeves","Футболка" },
            {"sweetshots","Свитеры и свитшоты" },
            {"shirts","Рубашка" },
            {"sweaters","Свитеры и свитшоты" },
            { "jeans","Джинсы"},
            {"trousers","Брюки" },
            {"jackets","Куртка" },
        };

        public static string? Format(string type)
        {
            if (keyValuePairs.TryGetValue(type.ToLower(), out var value))
                return value;

            return null;
        }

    }
}
