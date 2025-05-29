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
using adminPanel.Models;
namespace adminPanel
{
    /// <summary>
    /// Логика взаимодействия для GeneralPage.xaml
    /// </summary>
    public partial class GeneralPage : Page
    {
        private readonly ApiService _apiService;

        public GeneralPage(Admin admin)
        {

            _apiService = new ApiService();
            

            InitializeComponent();
            NameAdmin.Text = "Имя: " + admin.Name + " " + admin.Surname;
            EmailAdmin.Text = "Email: admin@example.com";
            RoleAdmin.Text = "Роль: Администратор";

            historyAdmin.ItemsSource = admin.Acts;
            if (historyAdmin.Items.Count == 0)
            {
                NoHistoryText.Visibility = Visibility.Visible;
            }
            else
            {
                NoHistoryText.Visibility = Visibility.Collapsed;
            }
            getgeneral();
        }


        private async void getgeneral()
        {
            var general = await _apiService.GetGeneralData();
            
            if (general != null)
            {
                CountBrand.Text = "Всего брендов: " + general.countBrands.ToString();
                CountCategory.Text = "Всего категорий: " + general.countCategories.ToString();
                CountOrder.Text = "Активных заказов: " + general.countOrders.ToString();
                CountUser.Text = "Всего пользователей: " + general.countUsers.ToString();
                CountProduct.Text = "Всего товаров: " + general.countProduct.ToString();

            }
        }
    }
}
