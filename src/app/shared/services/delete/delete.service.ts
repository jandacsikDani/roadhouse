import { ApplicationRef, ComponentRef, createComponent, inject, Injectable, Injector } from '@angular/core';
import { DeleteComponent } from '../../../components/delete/delete/delete.component';
import { Food } from '../../models/Food';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private componentRef?: ComponentRef<DeleteComponent>;

  constructor() { }

  open(food: Food): Promise<'YES' | 'NO'>{
    if(this.componentRef) return Promise.resolve('NO');
    return new Promise((resolve) => {
      this.componentRef = createComponent(DeleteComponent, {
        environmentInjector: this.appRef.injector,
        elementInjector: this.injector
      });

      this.componentRef.instance.food = food;

      this.componentRef.instance.yes.subscribe(() => {
        this.close();
        resolve('YES');
      });

      this.componentRef.instance.no.subscribe(() => {
        this.close();
        resolve('NO');
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
