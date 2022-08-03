import { TranslateService } from '@ngx-translate/core';
import { PermissionsService } from './../../../permissions.service';
import { Component, Input, OnInit } from '@angular/core';
import { Permission } from '../../../permission';
import * as _ from 'lodash';
import { Panel } from './panel';

@Component({
  selector: 'app-panel-profile',
  templateUrl: './panel-profile.component.html',
  styleUrls: ['./panel-profile.component.scss']
})
export class PanelProfileComponent implements OnInit {

  controls: string[] = []
  tabs: Panel[] = []
  tabsKey: string[] = []
  @Input()
  permissions!: Permission[];

  result:Panel[] = [{} as Panel];

  control:string = '';

  constructor(
    private permissionsService: PermissionsService,
    private translateService:TranslateService
  ) {

    this.permissionsService.listControllers()
    .subscribe(val=>{
      this.controls = val
    })

    this.permissionsService.getPermissions()
    .subscribe(x =>{
      this.result = []
      let permissionsId:any[] = x.getRawValue()
      permissionsId.forEach( id=>{
         let y = this.permissions.filter(x=>{return x.id == id})
         console.log()
         y.forEach(perm=>{
          //  console.log(perm)
          this.result.push({
            'key': perm.tab,
            'value': perm.detalhe
          } as Panel)
         })

      })
      this.controls.forEach( ( control )=>{
        let obj  = this.permissions.filter( x => { return x.controle == control});

      })
    });
    this.translateService.get('home.admin.profiles.form.tab.header')
    .subscribe(x =>{
      _.filter(x, (y:any,k:any)=>{

        this.tabs.push({
          'header':y,
          'key':k
        } as Panel)
        this.tabsKey.push(k)
      })

    });
  }

  isEmpty(key:string){
    let arrResult:any[] = [];
    arrResult = this.result.filter(x=>{return x.key == key});

    return arrResult.length?false:true;
  }

  isAll(key:string){
    let arrResult:any[] = [];
    let arrMaster:any[] = [];
    arrResult = this.result.filter(x=>{return x.key == key});
    arrMaster = this.permissions.filter(x=>{return x.tab == key});
    if(arrResult.length == 0) return false;

    return arrResult.length == arrMaster.length?true: false;
  }

  hasValues(key:string){
    let result = this.result.filter(x => {return x.key = key;} );
    return (result.length > 0)? true: false;

  }
  ngOnInit(): void {
  }
}
