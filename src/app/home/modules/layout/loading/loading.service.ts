import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  counterCallLoading = 0;

  private sub?: Subject<boolean>;

  init(sub: Subject<boolean>) {
    this.sub = sub;
  }

  show(reset = false) {
    if (reset) {
      this.counterCallLoading = 1;
    } else {
      this.counterCallLoading++;
    }
    if (this.counterCallLoading === 1) {
      this.sub?.next(true);
    }
  }

  hide(reset = false) {
    if (reset) {
      this.counterCallLoading = 0;
    } else {
      this.counterCallLoading--;
    }

    if (this.counterCallLoading === 0) {
      this.sub?.next(false);
    }
  }
}
