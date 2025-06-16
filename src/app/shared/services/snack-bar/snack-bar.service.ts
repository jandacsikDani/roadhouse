import { ApplicationRef, ComponentRef, createComponent, Injectable, Injector } from '@angular/core';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private injector: Injector, private appRef: ApplicationRef) { }

  show(message: string, duration: number = 3000){
    const snackbarRef: ComponentRef<SnackBarComponent> = createComponent(SnackBarComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
    });
    snackbarRef.instance.message = message;
    this.appRef.attachView(snackbarRef.hostView);
    const domElem = (snackbarRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    setTimeout(() => {
      this.appRef.detachView(snackbarRef.hostView);
      snackbarRef.destroy();
    }, duration);
  }

}
