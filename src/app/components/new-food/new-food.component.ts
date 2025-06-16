import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FoodType } from '../../shared/models/FoodType';
import { Food } from '../../shared/models/Food';
import { MenuService } from '../../shared/services/menu/menu.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-food',
  imports: [ReactiveFormsModule],
  templateUrl: './new-food.component.html',
  styleUrl: './new-food.component.css'
})
export class NewFoodComponent implements OnInit{
  @Output() closed = new EventEmitter<void>;
  @Output() saved = new EventEmitter<void>;

  pizza: boolean = false;
  soda: boolean = false;
  sodaChacked: boolean = true;
  foodTypes: FoodType[] = [];

  constructor(private menuService: MenuService){}

  edit = new FormGroup({
    cat: new FormControl(''),
    name: new FormControl(''),
    desc: new FormControl(''),
    price: new FormControl(''),
    smallprice: new FormControl(),
    bigprice: new FormControl(),
    isReturn: new FormControl(),
    returnPrice: new FormControl()
  });

  close(){
    this.closed.emit();
  }

  typeChange(type: Event){
    this.pizza = false;
    this.soda = false;
    const typeId = (type.target as HTMLSelectElement).value;
    if(typeId == '1'){
      this.pizza = true;
    }
    if(typeId == '7'){
      this.soda = true;
    }
  }

  save(){
    let newFood!: Food;
    if(this.pizza == true){
      const editedPrice = (this.edit.get('smallprice')?.value as unknown) as string + "Ft / " + (this.edit.get('bigprice')?.value as unknown) as string + "Ft";
      newFood = {
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
          typeid: (this.edit.get('cat')?.value as unknown) as number,
          name: (this.edit.get('name')?.value as unknown) as string,
          description: (this.edit.get('desc')?.value as unknown) as string,
          price: editedPrice
        }
      }else{
        const editedPrice = (this.edit.get('price')?.value as unknown) as string + "Ft";
        newFood = {
          typeid: (this.edit.get('cat')?.value as unknown) as number,
          name: (this.edit.get('name')?.value as unknown) as string,
          description: (this.edit.get('desc')?.value as unknown) as string,
          price: editedPrice
        }
      }
    }else{
      const editedPrice = (this.edit.get('price')?.value as unknown) as string + "Ft";
      newFood = {
        typeid: (this.edit.get('cat')?.value as unknown) as number,
        name: (this.edit.get('name')?.value as unknown) as string,
        description: (this.edit.get('desc')?.value as unknown) as string,
        price: editedPrice
      }
    }
    this.menuService.addNewFood(newFood).subscribe({
      next: (response) => {
        console.log(response);
        this.saved.emit();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.menuService.getFoodTypes().subscribe(data => {
      this.foodTypes = data;
    });
    this.edit.get('cat')?.setValue('0');
  }
}
