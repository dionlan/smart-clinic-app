import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from './profile';
import { SearchParams } from './search-params';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/admin/perfis';
  }

  find(id: string) {
    return this.httpClient.get<Profile>(this.url + '/' + id);
  }

  hasUser(id: string) {
    return this.httpClient.get<boolean>(this.url + '/' + id + '/user');
  }

  list(search: SearchParams | null): Observable<any> {
    let params = new HttpParams();
    if (search != null) {
      if (search.name) params = params.set('nome', search.name);
      if (search.radio_status)
      params = params.set('status', search.radio_status);
      if (search.funcionalidade)
      params = params.set('funcionalidade', search.funcionalidade);

    }
    return this.httpClient.get(this.url, { params: params });
  }

  create(profile: Profile) {
    return this.httpClient.post(this.url, profile);
  }

  update(profile: Profile) {
    return this.httpClient.put(this.url + '/' + profile.id, profile);
  }

  toggleActive(profile: Profile) {
    let newStatus = '';
    if (profile.ativo) newStatus = 'inativo';
    else newStatus = 'ativo';
    return this.httpClient.patch(
      this.url + '/' + profile.id + '/' + newStatus,
      {}
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
