import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MenuService } from '../../../shared/services/menu/menu.service';
import { FoodType } from '../../../shared/models/FoodType';
import { Food } from '../../../shared/models/Food';
import { Router } from '@angular/router';
import { DialogPanelComponent } from '../../../components/dialog-panel/dialog-panel.component';
import { DialogServiceService } from '../../../shared/services/dialog/dialog-service.service';
import { NewFoodService } from '../../../shared/services/new-food/new-food.service';

@Component({
  selector: 'app-control',
  imports: [ReactiveFormsModule],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent implements OnInit{
  public foodtypes: FoodType[] = [];
  public foods: Food[] = [];
  dialogOpen = false;

  constructor(private service: MenuService, private router: Router, 
    private dialogService: DialogServiceService,
    private newFoodService: NewFoodService
  ){}

  sort = new FormGroup({
    foodType: new FormControl('0')
  });

  newFood(){
    this.newFoodService.open();
  }

  deleteFood(food: Food){
    
  }

  showDialog(food: Food){
    this.foodtypes.forEach(element => {
      if(element.id == food.typeid){
        this.dialogService.open({
          food: food,
          type: element
        });
      }
    });
  }

  foodTypeChange(){
    this.foods = [];
    const selected = this.sort.get('foodType')?.value;
    if(selected == "0"){
      this.service.getAllFood().subscribe(data => {
        this.foods = data;
      });
    }else{
      this.service.getFoodsByTypeId(selected).subscribe(data => {
        this.foods = data;
      });
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
    this.service.getFoodTypes().subscribe(data => {
      this.foodtypes = data;
    })
    this.service.getAllFood().subscribe(data => {
        this.foods = data;
    });
  }
}
