   M S B A M L   `   `   `  ����E  AadminPanel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:adminPanel
adminPanel  5   	       adminPanel.MainWindow   5   	   R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   *localclr-namespace:adminPanel     5   	     � Title$  Admin Panel��5   	    � Icon$ Resourses/logo.png��6   $	��850��67   $
��1400��6D   ���#F4F7FC.��5	      �  � ColumnDefinitions 5
   
   �� 5      $
��auto �6   6.   �� 5      $��* �6   6+   .+�5   
   �� $��0��6   $
��Left=�6!   ���#2A3A59���#212E47$��1q�6g    �� CornerRadius$ 15��6{    �� Padding$ 15q�6�   $	��200��6�   ._�5      �� $��Stretch=�6   $	��Top=�67   .+�5      �� -   5        $��MainLogo��5      $��Resourses/logo.png��6(   $��60��6E   $��Center=�6Q   $��0,0,0,20q�6n   �� 5      -   5        $��BtnMain��5   A   $��Главная��6   $��10q�6P   $
��10,5q�6]      ButtonStyle#��[  6k   �� 5      -   5        $��BtnProducts��5   D   $��Товары��63   $��10q�6W   $
��10,5q�6d   #��[  6r   �� 5      -   5        $��	BtnBrands��5   B   $��Бренды��61   $��10q�6S   $
��10,5q�6`   #��[  6n   �� 5      -   5        $��	BtnOrders��5   *   $��Заказы��6   $��10q�6;   $
��10,5q�6H   #��[  6V   �� 5      -   5        $��BtnUsers��5   0   $��Пользователи��6   $��10q�6W   $
��10,5q�6d   #��[  6r   �� 5      -   5        $��BtnExit��5   )   $��
Выйти��6   $��10q�6N   $
��10,5q�6[   #��[  6i   5      5       � 5   
   -   5        $��	MainFrame��5        � NavigationUIVisibility$ Hidden=�6!   $��1��6A   6   5      5       