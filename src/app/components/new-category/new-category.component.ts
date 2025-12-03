import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuService } from '../../shared/services/menu/menu.service';
import { FoodType } from '../../shared/models/FoodType';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Food } from '../../shared/models/Food';

@Component({
  selector: 'app-new-category',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit{
  @Output() closed = new EventEmitter<void>;
  @Output() saved = new EventEmitter<void>;

  foodTypes: FoodType[] = [];
  maxLenght: number = this.foodTypes.length;

  constructor(private menuSerivce: MenuService){}

  newType = new FormGroup({
    name: new FormControl(''),
    order: new FormControl('')
  });

  addType(){
    let newType: FoodType = {
      name: (this.newType.get('name')?.value as unknown) as string,
      type_order: (this.newType.get('order')?.value as unknown) as number
    };
    this.reorder(newType);
    this.menuSerivce.addType(newType).subscribe(() => {
      this.newType.get('name')?.setValue("");
      this.newType.get('order')?.setValue("");
    });
    this.getTypes();
  }

  deleteType(id: number | undefined){
    let confi: boolean = confirm("Biztos törlöd a típust?");
    if(confi){
      this.menuSerivce.deleteType(id).then(() => {
        this.getTypes();
      });
    }
  }

  editOrder(){
    this.menuSerivce.updateTypes(this.foodTypes).then(response => {
      console.log(response);
    });
  }

  reorder(movedItem: FoodType){
    const newOrder = movedItem.type_order;
    const max = this.foodTypes.length;

    movedItem.type_order = Math.min(Math.max(newOrder, 1), max);

    const sorted = [...this.foodTypes].sort((a, b) => a.type_order - b.type_order);

    const oldIndex = sorted.findIndex(x => x.id === movedItem.id);
    sorted.splice(oldIndex, 1);

    const newIndex = movedItem.type_order - 1;
    sorted.splice(newIndex, 0, movedItem);

    sorted.forEach((x, i) => x.type_order = i + 1);

    this.foodTypes = sorted;
  }

  close(){
    this.closed.emit();
  }

  getTypes(){
    this.menuSerivce.getFoodTypes().subscribe(data => {
      this.foodTypes = data;
    });
  }

  ngOnInit(): void {
    this.getTypes();
  }

}
