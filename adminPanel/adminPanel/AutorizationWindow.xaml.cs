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
using adminPanel.Models;
namespace adminPanel
{
    /// <summary>
    /// Логика взаимодействия для AutorizationWindow.xaml
    /// </summary>
    public partial class AutorizationWindow : Window
    {

        private Admin _admin;
        public AutorizationWindow()
        {
            InitializeComponent();
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string login = Login.Text;
            string password = Password.Password;
            if(login.Length != 0 && password.Length != 0)
            {
                var _api = new ApiService();
                var (isAcsess, admin) = await _api.LoginAsync(login, password);
                if (isAcsess)
                {
                    _admin = admin;
                    var mainWindow = new MainWindow(admin);
                    mainWindow.Show();
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Логин или пароль неверны!");
                    Password.Password = "";
                    Login.Text = "";
                }

            }
        }
    }
}
