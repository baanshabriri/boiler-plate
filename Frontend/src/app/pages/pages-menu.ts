import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MANAGE',
    group: true,
  },
  {
    title: 'Data',
    icon: 'lock-outline',
    children: [
      {
        title: 'Users',
          link: '/pages/catalogue-management/users',
      },
      {
        title: 'Devices',
          link: '/pages/catalogue-management/devices',
      },
      {
        title: 'Rider',
          link: '/pages/catalogue-management/rider',
      },

    ],
  },
];
