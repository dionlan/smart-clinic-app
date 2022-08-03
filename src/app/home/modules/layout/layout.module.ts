import { Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { JitCompilerFactory } from "@angular/platform-browser-dynamic";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    LoadingComponent,
    BreadcrumbComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbCollapseModule
  ],
  exports: [
    LoadingComponent,
    BreadcrumbComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  providers: [
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ]
})
export class LayoutModule { }
