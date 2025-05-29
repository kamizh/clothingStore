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
    /// Логика взаимодействия для UserDetailPage.xaml
    /// </summary>
    public partial class UserDetailPage : Page
    {
        private readonly ApiService _apiService;
        private User _user;
        public UserDetailPage(User user)
        {
            InitializeComponent();
            _user = user;
            DataContext = user;
            _apiService = new ApiService(); 
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.GoBack();
        }

        private async void delete()
        {
            bool answer = await _apiService.deleteUser(_user.Id);
            if(answer)
            {
                MessageBox.Show("Данные клиент удален успешно!");
                Manager.MainFrame.GoBack();
            }
        }


        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            delete();
        }

        private void SaveChangeButton_Click(object sender, RoutedEventArgs e)
        {

            changeUser();




        }

        private async void changeUser()
        {
            bool answer = await _apiService.PutUser(_user);
            if (answer)
            {
                MessageBox.Show("Данные клиента успешно изменены!");
            }
            else
                MessageBox.Show("При изменении данных произошла ошибка");
            Manager.MainFrame.GoBack();
        }
    }
}
