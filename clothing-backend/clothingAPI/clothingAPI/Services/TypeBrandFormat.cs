using System.Collections.Generic;

namespace clothingAPI.Services
{
    public static class TypeBrandFormat
    {
        private static Dictionary<string, string> brands = new Dictionary<string, string>
        {
            {"champion","Champion" },
            {"bape","Bape" },
            {"nike","Nike" },
            {"carhartt","Carhartt" },
            {"thenorthface","The North Face" },
            {"dickies","Dickies" },
            {"stoneisland","Stone Island" },
            {"adidas","Adidas" }
        };

        public static string Format(string brand)
        {
            if (brands.TryGetValue(brand.ToLower(), out var value))
                return value;

            return null;
        }

    }
}
