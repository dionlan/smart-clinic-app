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
    icon: 'pi pi-building',
    routerLink: ['clinicas']
  },
  {
    title: 'home.side-menu.doctors.title',
    icon: 'fa fa-user-md fa-lg',
    routerLink: ['medicos'],
  },
  {
    title: 'home.side-menu.employees.title',
    icon: 'fa fa-id-badge fa-lg',
    routerLink: ['funcionarios'],
  },
  {
    title: 'home.side-menu.patients.title',
    icon: 'pi pi-user-plus',
    routerLink: ['pacientes'],
  }
];
