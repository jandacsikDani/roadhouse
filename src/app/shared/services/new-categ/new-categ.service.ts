import { ApplicationRef, ComponentRef, createComponent, inject, Injectable, Injector } from '@angular/core';
import { NewCategoryComponent } from '../../../components/new-category/new-category.component';

@Injectable({
  providedIn: 'root'
})
export class NewCategService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private componentRef?:ComponentRef<NewCategoryComponent>;
  constructor() { }

  open():Promise<'SAVED' | 'CANCELLED'>{
    if(this.componentRef) return Promise.resolve('CANCELLED');

    return new Promise((resolve) => {
      this.componentRef = createComponent(NewCategoryComponent, {
        environmentInjector: this.appRef.injector,
        elementInjector: this.injector
      });

      this.componentRef.instance.closed.subscribe(() => {
        this.close();
        resolve('CANCELLED');
      });

      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });

  }

  close(){
    if(!this.componentRef) return;

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = undefined;
  }
}
