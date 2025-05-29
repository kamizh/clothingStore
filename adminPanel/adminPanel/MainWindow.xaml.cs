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
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly Admin _admin;
        public MainWindow(Admin admin)
        {
            _admin = admin;
            InitializeComponent();
            MainFrame.Navigate(new GeneralPage(admin));
            Manager.MainFrame = MainFrame;


        }

        private void MainFrame_ContentRendered(object sender, EventArgs e)
        {

        }

        private void BtnMain_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new GeneralPage(_admin));
        }

        private void BtnExit_Click(object sender, RoutedEventArgs e)
        {
            var window = new AutorizationWindow();
            window.Show();
            this.Close();
        }

        private void BtnUsers_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new UsersPage(_admin));
        }

        private void BtnBrands_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new BrandsPage(_admin));
        }

        private void BtnProducts_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new ProductPage(_admin));
        }
    }

    
        
}
