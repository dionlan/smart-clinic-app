import { SafeUrl } from "@angular/platform-browser";

export interface FileModel {
  id:string;
  ativo: boolean;
  tamanho: number;
  nomeArquivoOriginal: string;
  nome: string
  caminho: string
  srcImage: SafeUrl | null
}
