import { FileModel } from 'src/app/shared/file/file.model';
import { Profile } from '../profiles/profile';

export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  ativo: boolean;
  profileId: number[];
  perfis: Profile[];
  status: string;
  imagem: FileModel;
  excluido: boolean;
  telefone: string;
}
