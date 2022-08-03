import { PermissionsService } from './../../../permissions.service';
import { Permission } from './../../../permission';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-profile',
  templateUrl: './checkbox-profile.component.html',
  styleUrls: ['./checkbox-profile.component.scss']
})
export class CheckboxProfileComponent implements OnInit {

  @Input()
  permissions: Permission[] = [];


  @Input()
  controle:string = '';

  @Input()
  title:string = '';

  constructor(
    private permissionsService: PermissionsService
  ) { }

  onCbChange(e: any){
    this.permissionsService.setSubjectPermission(e);
  }
  checkUncheckAll(e: any){
    this.permissionsService.setAllSubjectPermission(e);

  }
  ngOnInit(): void {
  }

}
