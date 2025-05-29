using adminPanel.Models;
using adminPanel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    
    public partial class BrandsPage : Page
    {
        private Admin _admin;
        private readonly ApiService _apiService;
        public BrandsPage(Admin admin)
        {
            _admin = admin;
            InitializeComponent();
            _apiService = new ApiService();
            GetBrandsAsync();
        }


        private async void GetBrandsAsync()
        {
           var brands = await _apiService.GetAllBrands();
            if(brands != null)
            {
                BrandListView.ItemsSource = brands;
            }

        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            var addWindow = new ItemAdd(true);
            addWindow.Show();
            GetBrandsAsync();
        }


        private async void DeleteBrand(int id)
        {
            bool answer = await _apiService.DeleteBrand(id);
            if(!answer)
            {
                MessageBox.Show("При удалении произошла ошибка!"); 
                return;
            }
            GetBrandsAsync();

        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Вы действительно хотите продолжить?", "Подтверждение",MessageBoxButton.OKCancel,MessageBoxImage.Question );
            if (result == MessageBoxResult.OK)
            {
                var brand = (sender as Button).DataContext as Brand;
                DeleteBrand(brand.Id);
             }
        }

        private void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            GetBrandsAsync();
        }
    }
}
