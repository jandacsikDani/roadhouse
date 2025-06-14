import { Injectable, inject, ApplicationRef, ComponentRef, createComponent, Injector } from '@angular/core';
import { DialogPanelComponent } from '../../../components/dialog-panel/dialog-panel.component';
import { Food } from '../../models/Food';
import { FoodType } from '../../models/FoodType';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private dialogRef?: ComponentRef<DialogPanelComponent>;

  constructor() { }

  open(data: { food: Food, type: FoodType}){
    if(this.dialogRef) return;

    this.dialogRef = createComponent(DialogPanelComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
    });

    this.dialogRef.instance.food = data.food;
    this.dialogRef.instance.type = data.type;

    this.dialogRef.instance.closed.subscribe(() => this.close());

    this.appRef.attachView(this.dialogRef.hostView);
    const domElem = (this.dialogRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  close(){
    if(!this.dialogRef) return;

    this.appRef.detachView(this.dialogRef.hostView);
    this.dialogRef.destroy();
    this.dialogRef = undefined;
  }
}
