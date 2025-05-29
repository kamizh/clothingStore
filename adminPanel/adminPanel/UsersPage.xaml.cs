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
using System.Windows.Navigation;
using System.Windows.Shapes;
using adminPanel.Services;

namespace adminPanel
{
    
    public partial class UsersPage : Page
    {

        private readonly ApiService _apiService;
        private List<User> _users;
        public UsersPage(Admin admin)
        {
            InitializeComponent();
            _apiService = new ApiService();
            GetUsers();
            ComboType.SelectedIndex = 0;
            
        }

        private void DataFormation()
        {
            var tempUsers = _users;
            switch(ComboType.SelectedIndex)
            {
                case 1:
                    tempUsers = tempUsers.OrderBy(p => p.SurName).ToList();
                    break;
                case 2:
                    tempUsers = tempUsers.OrderByDescending(p => p.SurName).ToList();
                    break;
                default:
                    break;
            }
            string searchText = Search.Text.ToLower();
            if (!string.IsNullOrWhiteSpace(searchText))
            {
                tempUsers = tempUsers.Where(p =>
                    p.Name.ToLower().Contains(searchText) ||
                    p.Email.ToLower().Contains(searchText) ||
                    p.SurName.Contains(searchText)).ToList();
            }

            if(OnlyLocked.IsChecked == true)
                tempUsers = tempUsers.Where(p => p.IsLocked).ToList();
            if(OnlyNotLocked.IsChecked == true)
                tempUsers = tempUsers.Where(p => !p.IsLocked).ToList();
            UsersListView.ItemsSource = tempUsers;





        }

        private async void GetUsers()
        {
            var users = await _apiService.GetUserData();
            if (users != null)
            {
                _users = users;
                UsersListView.ItemsSource = users;
                TotalUsers.Text = users.Count.ToString();
                int countNewUserToday = 0;
                foreach(var user in users)
                {
                    if(user.DataRegistration.Day == DateTime.Now.Day)
                        countNewUserToday++;
                }
                NewUsersToday.Text = countNewUserToday.ToString();  
            }
        }

        

        private void UserDetailButton_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new UserDetailPage((sender as Button) .DataContext as User));
            GetUsers();
        }

        private void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            GetUsers();
        }

        private void Search_SelectionChanged(object sender, RoutedEventArgs e)
        {
            DataFormation();
        }

        private void ComboType_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            DataFormation();
        }
    }
}
