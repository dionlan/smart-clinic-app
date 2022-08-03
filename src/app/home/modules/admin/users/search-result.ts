import { Profile } from '../profiles/profile';

export interface SearchResult {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: string;
  perfis: Profile[];
}
