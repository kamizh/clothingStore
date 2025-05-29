using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;
using adminPanel.Models;
using System;
using System.Windows.Documents;
using System.Threading;



namespace adminPanel.Services
{
    internal class ApiService
    {

        private string urlForGetBrands = "http://localhost:5095/api/admin/getAllBrands";
        private readonly HttpClient _client;

        public ApiService()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri("http://localhost:5095/api/admin/getAllBrands");
        }


        public async Task<List<SimpleProduct>> GetProducts()
        {
            string uri = "http://localhost:5095/api/admin/getAllProduct";
            try
            {
                HttpResponseMessage response = await _client.GetAsync(uri);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                var products = JsonConvert.DeserializeObject<SimpleProductResponse>(responseBody);
                return products?.products ?? new List<SimpleProduct>();

            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при запросе всех продуктов");
                return new List<SimpleProduct>();
            }
        }

        
        public async Task<List<Brand>> GetAllBrands()
        {
            try
            {
                HttpResponseMessage response = await _client.GetAsync("http://localhost:5095/api/admin/getBrands");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                var brandsResponse = JsonConvert.DeserializeObject<BrandsResponse>(responseBody);

                return brandsResponse?.Brands ?? new List<Brand>();
            }
            catch (Exception ex)
            {
                // Логирование ошибки
                Console.WriteLine(ex.Message);
                return new List<Brand>();
            }
        }
        

       

        public async Task<List<string>> GetColors()
        {
            string uri = "http://localhost:5095/api/admin/colors";

            try
            {
                HttpResponseMessage response = await _client.GetAsync(uri);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                var colors = JsonConvert.DeserializeObject<ColorResponse>(responseBody);

                return colors?.colors ?? new List<string>();
            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при запросе цветов");
                return new List<string>();
            }
        }
        




        public async Task<bool> AddProduct(SimpleProduct product)
        {
            string uri = "http://localhost:5095/api/admin/productAdd";

            try
            {

                var json = JsonConvert.SerializeObject(product);

                var content = new StringContent(json,Encoding.UTF8, "application/json");

                var response = await _client.PostAsync(uri, content);

                if(response.IsSuccessStatusCode)
                    return true;

                else
                    return false;

            }
            catch(Exception ex )
            {
                Console.WriteLine("Ошибка при запросе на добавление продукта");

                return false;
            }
        }




        public async Task<bool> AddBrand(Brand brand)
        {
            string uri = "http://localhost:5095/api/admin/addBrand";

            try
            {
                var brandBody = new
                {
                    Name = brand.Name,
                    Country = brand.Country,
                };

                var json = JsonConvert.SerializeObject(brandBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json"); ;


                var response = await _client.PostAsync(uri, content);

                if(response.IsSuccessStatusCode)
                    return true;

                return false;
                
            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при добавлении пользователя");

                return false;
            }
        }

        public async Task<bool> ChangeProduct(SimpleProduct product)
        {
            string uri = "http://localhost:5095/api/admin/putProduct";

            try
            {
                

                var json = JsonConvert.SerializeObject(product);
                var content = new StringContent(json, Encoding.UTF8, "application/json"); ;


                var response = await _client.PutAsync(uri, content);

                if (response.IsSuccessStatusCode)
                    return true;

                return false;

            }
            catch (Exception ex)
            {
                Console.WriteLine("Ошибка при редактировании товара");

                return false;
            }
        }


        public async Task<bool> DeleteBrand(int id)
        {
            string uri = "http://localhost:5095/api/admin/deleteBrand/" + id.ToString();

            try
            {
                var response = await _client.DeleteAsync(uri);

                if (response.IsSuccessStatusCode)
                    return true;

                return false;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при запросе на удаление бренда");

                return false;
            }
        }

        public async Task<bool> PutUser(User user)
        {
            string uri = "http://localhost:5095/api/admin/userChange";
            try
            {
                var json = JsonConvert.SerializeObject(user);
                Console.WriteLine($"Sending request to {uri} with body: {json}");

                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await _client.PutAsync(uri, content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Request successful");
                    return true;
                }
                else
                {
                    Console.WriteLine($"Request failed with status: {response.StatusCode}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during PUT request: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteProduct(int id)
        {

            string uri = "http://localhost:5095/api/admin/product/" + id.ToString();

            try
            {

                HttpResponseMessage response = await _client.DeleteAsync(uri);

                if (response.IsSuccessStatusCode)
                    return true;

                else
                    return false;


            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при удалении товара");

                return false ;
            }
        }


        public async Task<ProductDto> GetProductVariant(int Id)
        {
            string uri = "http://localhost:5095/api/admin/getProductvariants/" + Id.ToString();

            try
            {

                HttpResponseMessage response = await _client.GetAsync(uri);

                string responseBody = await response.Content.ReadAsStringAsync();

                var productDto = JsonConvert.DeserializeObject<ProductDto>(responseBody);

                return productDto ?? new ProductDto();

            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при получении вариантов продукта");

                return new ProductDto();
            }
        }


        public async  Task<bool> VariantAddPost(ProductVariantDtoPost variant)
        {
            string uri = "http://localhost:5095/api/admin/postVariant";

            try
            {

                var json = JsonConvert.SerializeObject(variant);

                var content = new StringContent(json,Encoding.UTF8, "application/json");

                var response = await _client.PostAsync(uri, content);

                if (response.IsSuccessStatusCode)
                    return true;

                else
                    return false;

            }
            catch(Exception ex)
            {

                Console.WriteLine("Ошибка при добавлении варианта продукта");

                return false;

            }

        }

        public async Task<bool> VariantChangePut(ProductVariantDto variant)
        {
            string uri = "http://localhost:5095/api/admin/putVariant";

            try
            {

                var json = JsonConvert.SerializeObject(variant);

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PutAsync(uri, content);

                if (response.IsSuccessStatusCode)
                    return true;

                else
                    return false;

            }
            catch (Exception ex)
            {

                Console.WriteLine("Ошибка при добавлении варианта продукта");

                return false;

            }

        }





        public async Task<(bool isSuccess, Admin admin)> LoginAsync(string login, string password)
        {
            try
            {
                var loginData = new
                {
                    login = login,
                    password = password
                };

                var json = JsonConvert.SerializeObject(loginData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PostAsync("http://localhost:5095/api/admin/login", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();

                    dynamic result = JsonConvert.DeserializeObject(responseBody);

                    bool answer = result.answer;

                    if (answer == true)
                    {
                        // Можно сразу вытянуть admin-объект
                        var adminJson = JsonConvert.SerializeObject(result.admin);
                        var admin = JsonConvert.DeserializeObject<Admin>(adminJson);

                        return (true, admin);
                    }
                }

                return (false, null);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                return (false, null);
            }
        }


        public async Task<List<Category>> GetCategories()
        {
            string uri = "http://localhost:5095/api/admin/category";
            try
            {
                HttpResponseMessage responce = await _client.GetAsync(uri);
                responce.EnsureSuccessStatusCode();

                string responceBody = await responce.Content.ReadAsStringAsync();

                var data = JsonConvert.DeserializeObject<CategoryResponse>(responceBody);

                return data?.categories ?? new List<Category>();

            }
            catch(Exception ex)
            {
                Console.WriteLine("Error from http server");
                return new List<Category>();
            }
        }

        public async Task<bool> DeleteProductVariant(int id)
        {

            string uri = "http://localhost:5095/api/admin/deleteProductVariant/" + id.ToString();

            try
            {

                HttpResponseMessage responseMessage = await _client.DeleteAsync(uri);

                if (responseMessage.IsSuccessStatusCode)
                    return true;

                else
                    return false;

            }
            catch(Exception ex)
            {
                Console.WriteLine("Ошибка при удалении варианта продукта");

                return false;
            }
        }



        public async Task<GeneralData> GetGeneralData()
        {
            string uri = "http://localhost:5095/api/admin/general";
            try
            {
                HttpResponseMessage response = await _client.GetAsync(uri);

                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                var data = JsonConvert.DeserializeObject<GeneralResponse>(responseBody);

                return data?.general ?? new GeneralData();

            }
            catch( Exception ex)
            {
                Console.WriteLine("Ошибка при запросе General Data");
                return new GeneralData();
            }
        }

        public async Task<List<User>> GetUserData()
        {
            string uri = "http://localhost:5095/api/admin/getUsers";


                HttpResponseMessage response = await _client.GetAsync(uri);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                var root = JsonConvert.DeserializeObject<RootObject>(responseBody);
                List<User> users = root.users.Result;

            // вот тут теперь не null
            return  users ?? new List<User>();
            
        }

        public async Task<bool> deleteUser(int id)
        {
            string uri = "http://localhost:5095/api/admin/deleteUser/" + id.ToString();

            try
            {
                HttpResponseMessage responce = await _client.DeleteAsync(uri);
                if (responce.IsSuccessStatusCode)
                    return true;
                else return false;
            }
            catch(Exception ex )
            {
                Console.WriteLine("Ошибка при запросе на удаление пользователя");
                return false;
            }
        }

        



    }


    



    public class ColorResponse
    {
        public List<string> colors { get; set; }
    }

    public class UsersWrapper
    {
        public List<User> Result { get; set; }
        public int Id { get; set; }
        public object Exception { get; set; }
        public int Status { get; set; }
        public bool IsCanceled { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsCompletedSuccessfully { get; set; }
        public int CreationOptions { get; set; }
        public object AsyncState { get; set; }
        public bool IsFaulted { get; set; }
    }


    public class SimpleProductResponse
    {
        public List<SimpleProduct> products { get; set; }
    }

    

    public class ProductResponse
    {
        public List<Product> products { get; set; } 
    }
    public class CategoryResponse
    {
        public List<Category> categories { get; set; }
    }

    public class RootObject
    {
        public UsersWrapper users { get; set; }
    }



    class BrandsResponse
    {
        public List<Brand> Brands { get; set; }
    }
    class GeneralResponse
    {
        public GeneralData general { get; set; }
    }

}
