using adminPanel.Models;
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
using System.Windows.Shapes;

namespace adminPanel
{
    /// <summary>
    /// Логика взаимодействия для AddSizeWindow.xaml
    /// </summary>
    public partial class AddSizeWindow : Window
    {

        private readonly ProductVariantDto _product;

        public AddSizeWindow(ProductVariantDto variantDto)
        {
            InitializeComponent();

            SizeBox.SelectedIndex = 0;
            _product = variantDto;

        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            string errors = "";

            bool isDuplicated = false;

            ComboBoxItem selectedItem = SizeBox.SelectedItem as ComboBoxItem;
            string selectedSize = selectedItem?.Content.ToString();



            foreach (var item in _product.Sizes)
            {
                if (selectedSize == item)
                    isDuplicated = true;
            }

            if (isDuplicated)
                errors += "Дубликатов размеров быть не должно!\n";

            if(CountBox.Text.Length == 0)
                errors += "Поле 'Количество' не должно быть пустым\n";

            if (CountBox.Text.Any(p => Char.IsLetter(p)))
                errors += "Неккоретный ввод поля 'Количество', только натуральное число!\n";

            if(errors.Length > 0)
            {
                MessageBox.Show(errors);
                return;
            }

            _product.Sizes.Add(selectedSize);


            this.DialogResult = true; 

        }
    }
}
