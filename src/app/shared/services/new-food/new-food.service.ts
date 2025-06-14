import { Injectable, inject, ApplicationRef, ComponentRef, createComponent, Injector } from '@angular/core';
import { NewFoodComponent } from '../../../components/new-food/new-food.component';

@Injectable({
  providedIn: 'root'
})
export class NewFoodService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private componentRef?: ComponentRef<NewFoodComponent>;

  constructor() { }

  open(){
    if(this.componentRef) return;

    this.componentRef = createComponent(NewFoodComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
    });

    this.componentRef.instance.closed.subscribe(() => this.close());

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  close(){
    if(!this.componentRef) return;

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = undefined;
  }
}
