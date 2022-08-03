import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {fromEvent, Observable} from "rxjs";
import {FileModel} from "./file.model";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url: string = environment.baseUrl + '/portal/arquivos'

  static emitirCursoCriado = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {
  }

  upload(file: any, repositoryId = 0, multiple = false) : Observable<FileModel> {
    const formData: FormData = new FormData();
    const params = {};
    formData.append('arquivo', file, file.name);

    if (repositoryId) {
      Object.assign(params, {
        idRepositorio: repositoryId
      });
    }

    if (multiple) {
      Object.assign(params, {
        multiple: multiple
      });
    }

    return this.httpClient.post<FileModel>(this.url, formData, {
      params: params
    });
  }

  remove(id: string, isPersist = false) {

    const params = {};

    if (isPersist) {
      Object.assign(params, {
        persistido: isPersist
      });
    }

    return this.httpClient.delete(this.url + '/' + id, {
      params: params
    });
  }

  download(name: string) {
    return this.httpClient.get(this.url + '/' + name, {responseType: 'blob'});
  }

  getDimensionsFromObjectURL(imageSrc: string): Observable<any> {
    let mapLoadedImage = (event: any) => {
      return {
        width: event.target.width,
        height: event.target.height
      };
    }
    var image = new Image();
    let $loadedImg = fromEvent(image, "load").pipe(take(1), map(mapLoadedImage));
    image.src = imageSrc;
    return $loadedImg;
  }

  list(values: any = null): Observable<FileModel[]> {
    let params = new HttpParams();
    if (values != null) {
      if (values.nome) params = params.set('nome', values.nome);
      if (values.idRepositorio) params = params.set('idRepositorio', values.idRepositorio);
    }
    return this.httpClient.get<FileModel[]>(this.url, {params: params});
  }

  getLink(name: string) {
    return environment.baseUrl + this.url + '/' + name;
  }

  resetFiles(){
    FileService.emitirCursoCriado.emit();
  }

  removeFile(file: any){
    FileService.emitirCursoCriado.emit(file);
  }

}
