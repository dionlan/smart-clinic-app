import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, AnimationBuilder, style} from "@angular/animations";
import {DOCUMENT} from "@angular/common";
import {Subject} from "rxjs";
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @ViewChild('loading') splashScreen?: ElementRef;
  show = true;
  private sub = new Subject<boolean>();

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private animationBuilder: AnimationBuilder,
    private splashScreenService: LoadingService
  ) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub.subscribe(show => {
      this.show = show;
      if (show) this.doShow()
      if (!show) this.doHide();

    });
    this.splashScreenService.init(this.sub);

  }

  private doHide() {
    this.document.body.classList.remove('overflow-hidden');
    const player = this.animationBuilder
      .build([style({opacity: '1'}), animate(800, style({opacity: '0'}))])
      .create(this.splashScreen!.nativeElement);

    setTimeout(() => player.play(), 100);
  }

  private doShow() {
    this.document.body.classList.add('overflow-hidden');
    const player = this.animationBuilder
      .build([style({opacity: '0'}), animate(100, style({opacity: '0.5'}))])
      .create(this.splashScreen!.nativeElement);
    setTimeout(() => player.play(), 100);
  }

}
