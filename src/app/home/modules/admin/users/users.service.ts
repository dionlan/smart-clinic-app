import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { SearchParams } from './search-params';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/usuario';
  }

  list(searchParams: SearchParams | null): Observable<any> {
    let params = new HttpParams();
    if (searchParams != null) {
      if (searchParams.name) params = params.set('nome', searchParams.name);
    }
    return this.httpClient.get<User>(this.url, { params: params });
  }

  listUsers(searchParams: SearchParams | null): Observable<any> {
    let params = new HttpParams();
    if (searchParams != null) {
      if (searchParams.PageNumber) params = params.set('PageNumber', searchParams.PageNumber);
      if (searchParams.PageSize) params = params.set('PageSize', searchParams.PageSize);
    }
    return this.httpClient.get<User>(this.url + '/paginado', { params: params });
  }

  find(id: string | null): Observable<User> {
    return this.httpClient.get<User>(this.url + '/' + id);
  }

  create(user: User) {
    return this.httpClient.post<User>(this.url, user);
  }

  update(user: User) {
    return this.httpClient.put<User>(this.url + '/' + user.id, user);
  }

  toggleActive(user: User) {
    let newStatus = '';
    if (user.ativo) newStatus = 'inativo';
    else newStatus = 'ativo';
    return this.httpClient.patch(this.url + '/' + user.id + '/' + newStatus , {});
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + + id);
  }
}
