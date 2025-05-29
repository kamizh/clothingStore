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
    /// <summary>
    /// Логика взаимодействия для VariantsPage.xaml
    /// </summary>
    public partial class VariantsPage : Page
    {


        private ApiService _apiService;
        private readonly ProductDto _product;


        public VariantsPage(ProductDto product)
        {
            InitializeComponent();

            NameProduct.Text = product.Name;
            VariantsListView.ItemsSource = product.Variants;
            _product = product;

            if (product.Variants.Count == 0)
                NotText.Text = "Варианты продукта отстствуют";

            _apiService = new ApiService();
        }


        private async void UpdatePage()
        {
            if (_product.Variants.Count > 0)
                NotText.Visibility = Visibility.Visible;

            var product = await _apiService.GetProductVariant(_product.Id);

            VariantsListView.ItemsSource = null;
            VariantsListView.ItemsSource = product.Variants;
        }


        private async void DeleteVariantProduct(int id)
        {
            bool answer = await _apiService.DeleteProductVariant(id);

            if (!answer)
                MessageBox.Show("При удалении произошла ошибка!");
            else
                UpdatePage();
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new AddEditVariantPage(null, _product));
            UpdatePage();

        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new AddEditVariantPage((sender as Button).DataContext as ProductVariantDto,_product));
            UpdatePage();
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Данное действие приведет к удалению товара. Вы точно хотите продолжить?", "Подтверждение", MessageBoxButton.OKCancel, MessageBoxImage.Question);
            
            if (result == MessageBoxResult.OK)
            {
                DeleteVariantProduct(((sender as Button).DataContext as ProductVariantDto).Id);
            }

        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.GoBack();
        }
    }
}
