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
    /// Логика взаимодействия для AddEditVariantPage.xaml
    /// </summary>
    public partial class AddEditVariantPage : Page
    {
        private readonly ApiService _apiService;
        private readonly ProductVariantDto _variant;

        private List<CloudImage> _images = new List<CloudImage>();

        private List<string> colors = new List<string>();

        private bool isEdit = true;
        private readonly ProductDto _product;

        public AddEditVariantPage(ProductVariantDto variant, ProductDto product)
        {
            InitializeComponent();

            _variant = variant;




            _apiService = new ApiService();
            _product = product;

            if (variant == null)
            {
                isEdit = false;
                _variant = new ProductVariantDto();
            }


            if (_variant.Id != 0)
                SizeListView.ItemsSource = _variant.Sizes;

            else
            {
                _variant.Sizes = new List<string>();

                SizeListView.ItemsSource = _variant.Sizes;
            }

            DataContext = _variant;


            if (_variant.Images != null)
            {

                foreach (var item in _variant.Images)
                {
                    CloudImage image = new CloudImage { PublicId = "", Url = item };
                    _images.Add(image);
                }


                ImagePreviewPanel.ItemsSource = _images;
            }

            GetColors();






        }


        private async void GetColors()
        {
            colors = await _apiService.GetColors();

        }

        private void AddSizeButton_Click(object sender, RoutedEventArgs e)
        {

            if (_variant.Sizes.Count < 5)
            {
                var sizeWindow = new AddSizeWindow(_variant);

                bool? result = sizeWindow.ShowDialog();

                SizeListView.ItemsSource = null;
                SizeListView.ItemsSource = _variant.Sizes;
            }

            else
                MessageBox.Show("Все размеры присутствуют");



        }

        private async void UploadImage_Click(object sender, RoutedEventArgs e)
        {
            Microsoft.Win32.OpenFileDialog dlg = new Microsoft.Win32.OpenFileDialog();
            dlg.Filter = "Image files (*.jpg, *.jpeg, *.png, *.webp)|*.jpg;*.jpeg;*.png;*.webp";

            if (dlg.ShowDialog() == true)
            {
                var filePath = dlg.FileName;
                var result = await CloudinaryService.UploadImageAsync(filePath);

                if (result != null)
                {
                    _images.Add(result);

                    ImagePreviewPanel.ItemsSource = null;
                    ImagePreviewPanel.ItemsSource = _images;
                }
            }
        }

        private async void DeleteImage_Click(object sender, RoutedEventArgs e)
        {
            var image = (sender as Button).Tag as CloudImage;
            if (image != null)
            {
                bool deleted = await CloudinaryService.DeleteImageAsync(image.Url);
                if (deleted)
                {
                    _images.Remove(image);

                    ImagePreviewPanel.ItemsSource = null;
                    ImagePreviewPanel.ItemsSource = _images;
                }
            }
        }





        private async void ChangeVariantPut()
        {
            bool answer = await _apiService.VariantChangePut(_variant);

            if (answer)
            {
                MessageBox.Show("Данные сохранены!");
                Manager.MainFrame.GoBack();
            }

            else
                MessageBox.Show("Произошла ошибка!");

        }

        private async void AddVariantPost()
        {
            var newVariant = new ProductVariantDtoPost
            {
                Id = _variant.Id,
                Price = _variant.Price,
                Discount = _variant.Discount,
                CareAndWashing = _variant.CareAndWashing,
                Color = _variant.Color,
                Images = _variant.Images,
                ProductId = _product.Id,
                Sizes = _variant.Sizes,
            };

            bool answer = await _apiService.VariantAddPost(newVariant);

            if (answer)
            {
                MessageBox.Show("Данные сохранены!");
                Manager.MainFrame.GoBack();
            }

            else
                MessageBox.Show("Произошла ошибка!");

        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {

            string errors = "";

            if (_variant.Price.ToString().Length < 1)
                errors += "Поле 'Цена' должно быть заполнено\n";

            if (_variant.Discount.ToString().Length == 0)
                errors += "Поле 'Скидка' не должно быть пустым\n";

            if (_variant.CareAndWashing.ToString().Length == 0)
                errors += "Поле 'Метод стирки' не должно быть пустым\n";

            if (_variant.Color.ToString().Length == 0)
                errors += "Поле 'Цвет' не должно быть пустым\n";



            if (!colors.Any(p => p == _variant.Color))
                errors += "Цвет должен быть соотвествующий\n";

            if (_images == null && _images.Count == 0)
                errors += "Должна быть хотя бы одна фотография\n";

            if (errors.Length > 0)
            {
                MessageBox.Show(errors);
                return;
            }
            List<string> newImages = new List<string>();

            foreach (var item in _images)
            {
                newImages.Add(item.Url);
            }

            _variant.Images = newImages;




            if (isEdit)
            {
                ChangeVariantPut();
            }
            else
                AddVariantPost();






        }

        private void DeleteSizeButton_Click(object sender, RoutedEventArgs e)
        {

            MessageBoxResult result = MessageBox.Show("Данное действие приведет к удалению товара. Вы точно хотите продолжить?", "Подтверждение", MessageBoxButton.OKCancel, MessageBoxImage.Question);

            if (result == MessageBoxResult.OK)
            {
                var elem = (sender as Button).DataContext as string;

                _variant.Sizes.Remove(elem);

                SizeListView.ItemsSource = null;

                SizeListView.ItemsSource = _variant.Sizes;
            }





        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.GoBack();
        }

        private void AddAllSizeButton_Click(object sender, RoutedEventArgs e)
        {

            if(_variant.Sizes.Count == 5)
            {
                MessageBox.Show("Все размеры выбраны!");
                return;
            }

            _variant.Sizes = new List<string>() { "XS", "S", "M", "L", "XL" };

            SizeListView.ItemsSource = null;
            SizeListView.ItemsSource = _variant.Sizes;


            
        }
    }
}
