import { Profile } from '../profiles/profile';

export interface User {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  perfil: number;
  perfilDescricao: string;
  dataCadastro: any;
  dataCadastroString: string;
  //perfis: Profile[];
}
