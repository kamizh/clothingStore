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
using System.Windows.Shapes;

namespace adminPanel
{
    /// <summary>
    /// Логика взаимодействия для ItemAdd.xaml
    /// </summary>
    public partial class ItemAdd : Window
    {
        private readonly ApiService _apiService = new ApiService();
        private bool act;
        public ItemAdd(bool act)
        {
            this.act = act;
            InitializeComponent();
            if(act)
            {
                Title.Text = "Добавить бренд";
            }
            else
            {
                Title.Text = "Добавить категорию";
                CountryBox.Visibility = Visibility.Hidden;
            }
        }

        private async void AddBrand()
        {
            Brand brand = new Brand();
            if (CountryBox.Text.Length > 0 && NameBox.Text.Length > 0)
            {
                brand.Country = CountryBox.Text;
                brand.Name = NameBox.Text;
                bool answer = await _apiService.AddBrand(brand);
                if(answer)
                {
                    MessageBox.Show("Бренд успешно добавлен!");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("При добавлении произошла ошибка!");
                }
            }
            else
                MessageBox.Show("Все поля должны быть заполнены!");
        }


        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if(act)
                AddBrand();
            else { };
        }
    }
}
