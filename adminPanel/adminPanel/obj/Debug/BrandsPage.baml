   M S B A M L   `   `   `  ����E  AadminPanel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:adminPanel
adminPanel  5          adminPanel.BrandsPage   5      R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      *localclr-namespace:adminPanel     5        N� Title$  
BrandsPage��5	      .��5      �  � RowDefinitions 5   
   �� 5      $
��auto �6   6,   �� 5      $��* �6   6)   �� 5      $
��auto �6   6,   .+�5   
   �� ���	#FF262628$��Бренды��6+   $��	50 40 0 0q�69   $��30(�6L   $��DemiBold"�6Z   $
��Left=�6p   6�   �� 5   
   -   5        $��UpdateButton��5   i   
�������
�������$��Right=�66   $��50��6R   $��50��6]   .��5      �� $��Resourses/update.png��6   $��Uniform=�62   5      �� 5   
   $��1��6   ���	#FFC6C2C2$��1q�66    �� CornerRadius$ 15��6J    �� Padding$ 2q�6\   $��50q�6h   ._�5      �� -   5        $��BrandListView��5      ��5      �� 5      .R�5      �  � ColumnDefinitions 5      �� 5   "   $	��500 �63   6A   �� 5   "   $��* �63   6?   .+�5      �� $��0��6(   $��20(�68   ���	#FF262628$
��Left=�6s   $��DemiBold"�6�   ��6F   �� *Name+6�   �� 5      $��1��6%   $��Right=�65   ���	#FFC6C2C2$ 25��6i   ._�5    "   �� $��DeleteButton��6k   -   5        $��75��5    )   $��Right=�64   $��Удалить��6   ���	#FF2626286�   5!      5"      5#      5%      5'      �� 5(      -   5        $��	AddButton��5/      $��2��5(      $#��+ Добавить бренд��5)      $��Center=�5*      $��Bottom=�5+      $��0 10 0 0q�5,      $
��12 6q�5-      $��16(�5.      $��SemiBold"�51      ���#007ACC
�������$��0q�54       � Cursor$
 Hand��55      $	��200��56      57      58      