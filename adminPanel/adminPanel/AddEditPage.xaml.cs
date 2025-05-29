using adminPanel.Models;
using adminPanel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
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
    /// Логика взаимодействия для AddEditPage.xaml
    /// </summary>
    public partial class AddEditPage : Page
    {
        private SimpleProduct _product;
        private readonly ApiService _apiService;
        private bool _isEdit = false;

        
        private List<Brand> _brands;
        private List<Category> _categories;
        public AddEditPage(SimpleProduct product,List<Category> categories,List<Brand> brands)
        {
            InitializeComponent();
            _product = new SimpleProduct();
            if(product != null)
            {
                _product = product;
                _isEdit = true;
                if (_product.GenderName == "Мужской")
                    GenderBox.SelectedIndex = 0;
                else
                    GenderBox.SelectedIndex = 1;
            }

            _categories = categories;
            _brands = brands;
            _apiService = new ApiService();
            DataContext = _product;

            if(product == null)
                GenderBox.SelectedIndex = 0;
        }


        private async void AddNewProduct()
        {
            bool answer = await _apiService.AddProduct(_product);

            if (answer)
            {
                MessageBox.Show("Товар успешно добавлен");

                Manager.MainFrame.GoBack();
            }
            else
            {
                MessageBox.Show("При добавлении товара произошла ошибка");

                return;
            }

          
        }

        private async void ChangeProduct()
        {
            bool answer = await _apiService.ChangeProduct(_product);

            if (answer)
            {
                MessageBox.Show("Товар успешно отредактирован");

                Manager.MainFrame.GoBack();
            }
            else
            {
                MessageBox.Show("При редактировании товара произошла ошибка");

                return;
            }


        }




        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            string errors = "";

            if (string.IsNullOrEmpty(_product.Name))
                errors += "Поле 'Название' не должно быть пустым!\n";
            if (string.IsNullOrEmpty(_product.Article))
                errors += "Поле 'Артикул' не должно быть пустым!\n";
            if (string.IsNullOrEmpty(_product.Description))
                errors += "Поле 'Описание' не должно быть пустым!\n";
            if (string.IsNullOrEmpty(_product.Compound))
                errors += "Поле 'Состав' не должно быть пустым!\n";
            if (string.IsNullOrEmpty(_product.CategoryName))
                errors += "Поле 'Категория' не должно быть пустым!\n";
            if (string.IsNullOrEmpty(_product.BrandName))
                errors += "Поле 'Бренд' не должно быть пустым!\n";
            
            if(errors.Length > 0)
            {
                MessageBox.Show(errors);
                return;
            }

            errors = "";
                
            bool isValidCategory = false;
            bool isValidBrand = false;

            foreach(var brand in _brands)
            {
                if (brand.Name == _product.BrandName)
                    isValidBrand = true;
            }

            foreach (var category in _categories)
            {
                if (category.Name == _product.CategoryName)
                    isValidCategory = true;
            }

            if (!isValidBrand)
                errors += "Выбранного бренда не существует\n";

            if (!isValidCategory)
                errors += "Выбранной категории не существует!\n";

            if(errors.Length > 0)
            {
                MessageBox.Show(errors);
                return;
            }

            _product.GenderName = GenderBox.SelectedIndex == 0 ? "Мужской" : "Женский";

            if (_isEdit)
                ChangeProduct();
            else
                AddNewProduct();






        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.GoBack();
        }
    }
}
