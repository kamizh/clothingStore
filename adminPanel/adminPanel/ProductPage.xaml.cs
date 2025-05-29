using adminPanel.Models;
using adminPanel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace adminPanel
{
    /// <summary>
    /// Логика взаимодействия для ProductPage.xaml
    /// </summary>
    public partial class ProductPage : Page
    {



        private List<SimpleProduct> _products;
        private readonly ApiService _apiService;
        private readonly Admin _admin;
        private  List<Brand> _brands;
        private  List<Category> _categories;
        private bool isInstalize = false;



        public ProductPage(Admin admin)
        {
            _apiService = new ApiService();
            InitializeComponent();
            _admin = admin;
            Loaded += ProductPage_Loaded;
            BrandFilter.SelectedIndex = 0;
            CategoryFilter.SelectedIndex = 0;
        }


        private async void ProductPage_Loaded(object sender, RoutedEventArgs e)
        {
            await GetAllProduct();
            isInstalize = true;
        }

        private async Task GetAllProduct()
        {
            var products = await _apiService.GetProducts();
            if (products != null)
            {
                ProductDataGrid.ItemsSource = products;
                _products = products;
            }

            var brands= await _apiService.GetAllBrands();
            var categories = await _apiService.GetCategories();

            _brands = brands;
            _categories = categories;

            var stringBrands = brands.Select(b => b.Name).ToList();
            stringBrands.Insert(0, "Бренды");

            var stringCategory = categories.Select(b => b.Name).ToList();
            stringCategory.Insert(0, "Категория");

            BrandFilter.ItemsSource = stringBrands;
            CategoryFilter.ItemsSource = stringCategory;

        }



        private async void UpdatePage()
        {
            var products = await _apiService.GetProducts();

            switch(GenderFilter.SelectedIndex)
            {
                case 1:
                    products = products.Where(p => p.GenderName == "Мужской").ToList(); break;
                case 2:
                    products = products.Where(p => p.GenderName == "Женский").ToList(); break;
                default: break;

            }
            switch(Sort.SelectedIndex)
            {
                case 1:
                    products = products.OrderBy(p => p.Name).ToList(); break;
                case 2:
                    products = products.OrderByDescending(p => p.Name).ToList(); break;
                case 3:
                    products = products.OrderBy(p => p.BrandName).ToList(); break;
                default: break;
            }
            if(BrandFilter.SelectedIndex != 0) 
                products = products.Where(p => p.BrandName == _brands[BrandFilter.SelectedIndex-1].Name).ToList();
            if (CategoryFilter.SelectedIndex != 0)
                products = products.Where(p => p.CategoryName == _categories[CategoryFilter.SelectedIndex-1].Name).ToList();


            string searchText = Search.Text.ToLower();
            if (!string.IsNullOrWhiteSpace(searchText))
            {
                products = products.Where(p =>
                    p.Name.ToLower().Contains(searchText)).ToList();
            }

            ProductDataGrid.ItemsSource = products;

        }

        


        private async void DeleteProduct(int id)
        {
            bool answer = await _apiService.DeleteProduct(id);

            if (answer)
                UpdatePage();
            else
                Console.WriteLine("При удалении произошла ошибка");
        }


        private async void GetVariants(int id)
        {

            ProductDto variants = await _apiService.GetProductVariant(id);

            Manager.MainFrame.Navigate(new VariantsPage(variants));


        }


        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Данное действие приведет к удалению товара. Вы точно хотите продолжить?", "Подтверждение", MessageBoxButton.OKCancel, MessageBoxImage.Question);
            if (result == MessageBoxResult.OK)
            {
                
                DeleteProduct(((sender as Button).DataContext as SimpleProduct).Id);




            }
        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new AddEditPage((sender as Button).DataContext as SimpleProduct,_categories,_brands));
        }

        private void VariantButton_Click(object sender, RoutedEventArgs e)
        {
            GetVariants(((sender as Button).DataContext as SimpleProduct).Id);
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new AddEditPage(null,_categories,_brands));
        }

        private void BrandFilter_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(isInstalize)
                UpdatePage();
        }

        private void CategoryFilter_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(isInstalize)
                UpdatePage();

        }

        private void GenderFilter_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(isInstalize)
                UpdatePage();

        }

        private void Sort_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(isInstalize)
                UpdatePage();

        }

        private void Search_TextChanged(object sender, TextChangedEventArgs e)
        {
            if(isInstalize)
                UpdatePage();

        }


    }
    
}
