import { Permission } from './permission';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  url: string;

  subjectPermission: Subject<any> = new Subject();
  subjectAllPermission: Subject<any> = new Subject();
  permissions: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/admin/permissoes';
  }

  list(): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(this.url);
  }

  listControllers(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + '/controllers');
  }

  setSubjectPermission(value : any){
    this.subjectPermission.next(value);
  }

  getSubjectPermission():Observable<any>{
    return this.subjectPermission.asObservable();
  }

  setAllSubjectPermission(value : any){
    this.subjectAllPermission.next(value);
  }

  getPermissions():Observable<any>{
    return this.permissions.asObservable();
  }

  setPermissions(value : any){
    this.permissions.next(value);
  }

  getAllSubjectPermission():Observable<any>{
    return this.subjectAllPermission.asObservable();
  }
}
