import { Permission } from '../permission';

export class Profile {
  id!: number;
  nome!: string;
  ativo!: boolean;
  permissoes!: Permission[];
}
