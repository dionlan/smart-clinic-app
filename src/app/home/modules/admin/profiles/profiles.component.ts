import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from './profile';
import { ProfilesService } from './profiles.service';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Permission } from '../permission';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  form!: FormGroup;
  params!: SearchParams;
  result: SearchResult[] = [];
  resultFeatures: Permission[] = [];
  onEmptyResultSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfilesService,
    private permissionsService: PermissionsService,
    private modalService: NgbModal,
    private translateService:TranslateService
  ) {}

  ngOnInit(): void {
    this.permissionsService.list().subscribe(x =>{
      this.resultFeatures = x;
    });
    this.form = this.formBuilder.group({
      name: ['', []],
      radio_status: ['true', []],
      funcionalidade: ['', []],
    });
    this.search();
    this.subscribeOnEmptyResult();
  }
  ngOnDestroy(): void {
    this.onEmptyResultSubject.unsubscribe();
  }
  subscribeOnEmptyResult() {
    this.onEmptyResultSubject.subscribe(() => {
      this.reset();
    });
  }
  public permissionNames(profile: Profile): string {
    if(profile.permissoes.length == 0){
      return this.translateService.instant('home.admin.users.form.empty.label')
    }
    return profile.permissoes.map((p) => p.nome).join(', ');
  }

  public selectedFeature(){
    this.form.controls.servicoAtendimento.value
  }

  public reset(){
    this.form = this.formBuilder.group({
      name: ['', []],
      funcionalidade: ['', []],
      radio_status: ['true', []],
    });
    this.search();
  }
  public search(): void {
    this.params = this.form.getRawValue() as SearchParams;
    this.list();
  }

  private list(): void {
    this.profileService.list(this.params).subscribe(
      (res) => {
        this.result = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public delete(profile: Profile): void {
    this.profileService.delete(profile.id).subscribe(
      () => {
        this.search();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public toggleActive(profile: Profile): void {
    this.profileService.toggleActive(profile).subscribe(
      () => {
        this.search();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public open(content: any, profile: Profile) {
    this.modalService.open(content, {}).result.then(
      (result) => {
        this.delete(profile);
      },
      (reason) => {}
    );
  }
}
