import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div>
    <div>404: Page Not Found</div>
    <div> We couldn't find that page! Not even with x-ray vision. </div>
    <div>
      <button routerLink="/">
        Take Me Home
      </button>
    </div>
</div>
  `,
  styles: [
    `
    :host {
      text-align: center;
    }
    `
  ]
})
export class PageNotFoundComponent { }
