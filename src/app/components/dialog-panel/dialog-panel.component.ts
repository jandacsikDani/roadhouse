import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { MenuService } from '../../shared/services/menu/menu.service';
import { Food } from '../../shared/models/Food';
import { FoodType } from '../../shared/models/FoodType';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-panel.component.html',
  styleUrl: './dialog-panel.component.css'
})
export class DialogPanelComponent implements OnInit{
  @Input() food: Food | null = null;
  @Input() type: FoodType | null = null;
  
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  
  pizza: boolean = false;
  soda: boolean = false;
  sodaChacked: boolean = true;
  foodTypes: FoodType[] = [];
  edit!: FormGroup;

  constructor(private menuServive: MenuService){}


  close(){
    this.closed.emit();
  }

  save(){
    let newFood!: Food;
    if(this.pizza == true){
      const editedPrice = (this.edit.get('smallprice')?.value as unknown) as string + "Ft / " + (this.edit.get('bigprice')?.value as unknown) as string + "Ft";
      newFood = {
        id: this.food?.id,
        typeid: (this.edit.get('cat')?.value as unknown) as number,
        name: (this.edit.get('name')?.value as unknown) as string,
        description: (this.edit.get('desc')?.value as unknown) as string,
        price: editedPrice
      }
    }else if (this.soda == true){
      this.sodaChacked = (this.edit.get('isReturn')?.value as unknown) as boolean;
      if(this.sodaChacked){
        const editedPrice = (this.edit.get('price')?.value as unknown) as string + "Ft + " + (this.edit.get('returnPrice')?.value as unknown) as string + "Ft betétdíj";
        newFood = {
          id: this.food?.id,
          typeid: (this.edit.get('cat')?.value as unknown) as number,
          name: (this.edit.get('name')?.value as unknown) as string,
          description: (this.edit.get('desc')?.value as unknown) as string,
          price: editedPrice
        }
      }else{
        const editedPrice = (this.edit.get('price')?.value as unknown) as string + "Ft";
        newFood = {
          id: this.food?.id,
          typeid: (this.edit.get('cat')?.value as unknown) as number,
          name: (this.edit.get('name')?.value as unknown) as string,
          description: (this.edit.get('desc')?.value as unknown) as string,
          price: editedPrice
        }
      }
    }else{
      const editedPrice = (this.edit.get('price')?.value as unknown) as string + "Ft";
      newFood = {
        id: this.food?.id,
        typeid: (this.edit.get('cat')?.value as unknown) as number,
        name: (this.edit.get('name')?.value as unknown) as string,
        description: (this.edit.get('desc')?.value as unknown) as string,
        price: editedPrice
      }
    }
    this.menuServive.updateFood(newFood).then(response => {
      console.log(response);
      this.saved.emit();
    })
    .catch(error => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.menuServive.getFoodTypes().subscribe(data => {
      this.foodTypes = data;
    });
    if(this.type?.id == 1){
      this.pizza = true;
      const prices = this.food?.price.split('/').map(part => {
        return part.replace(/Ft/g, '').trim()
      });
      this.edit = new FormGroup({
        cat: new FormControl(`${this.type?.id}`),
        name: new FormControl(this.food?.name),
        desc: new FormControl(this.food?.description),
        smallprice: new FormControl(prices![0]),
        bigprice: new FormControl(prices![1])
      });
    }else if(this.type?.id == 7){
      this.soda = true;
      
      const price = this.food?.price.split('+')[0].replace(/Ft/g,'').trim();
      this.edit = new FormGroup({
        cat: new FormControl(`${this.type?.id}`),
        name: new FormControl(this.food?.name),
        desc: new FormControl(this.food?.description),
        price: new FormControl(price),
      });
    }else{
      const price = this.food?.price.replace(/Ft/g, '').trim();
      this.edit = new FormGroup({
        cat: new FormControl(`${this.type?.id}`),
        name: new FormControl(this.food?.name),
        desc: new FormControl(this.food?.description),
        price: new FormControl(price)
      });
    }
  }
}
