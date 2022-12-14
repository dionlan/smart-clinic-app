import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/usuario/paginado';
  }

  getData(): Observable<any> {
    return this.httpClient.get<any>(this.url, {});
  }
}
