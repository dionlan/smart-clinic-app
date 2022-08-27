export const MenuItemsConfig = [
  {
    title: 'home.side-menu.admin.title',
    icon: 'pi pi-cog',
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
    icon: 'pi pi-users',
    routerLink: ['medicos'],
  },
  {
    title: 'home.side-menu.employees.title',
    icon: 'pi pi-id-card',
    routerLink: ['funcionarios'],
  },
  {
    title: 'home.side-menu.patients.title',
    icon: 'pi pi-user-plus',
    routerLink: ['pacientes'],
  }
];
