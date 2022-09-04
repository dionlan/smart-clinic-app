export const MenuItemsConfig = [
  {
    title: 'home.side-menu.admin.title',
    icon: 'fa fa-cog fa-lg',
    routerLink: [''],
    children: [
      {
        title: 'home.side-menu.admin.users',
        routerLink: ['admin', 'usuarios'],
      },
      {
        title: 'home.side-menu.admin.profiles',
        routerLink: ['admin', 'perfis']
      }
    ]
  },
  {
    title: 'home.side-menu.clinics.title',
    icon: 'fa fa-hospital fa-lg',
    routerLink: ['clinicas']
  },
  {
    title: 'home.side-menu.affiliates.title',
    icon: 'fa fa-house-medical-circle-check fa-lg',
    routerLink: ['filiais']
  },
  {
    title: 'home.side-menu.doctors.title',
    icon: 'fa fa-user-md fa-lg',
    routerLink: ['medicos'],
  },
  {
    title: 'home.side-menu.employees.title',
    icon: 'fa fa-id-card-clip fa-lg',
    routerLink: ['funcionarios'],
  },
  {
    title: 'home.side-menu.patients.title',
    icon: 'fa fa-bed-pulse fa-lg',
    routerLink: ['pacientes'],
  }
];
