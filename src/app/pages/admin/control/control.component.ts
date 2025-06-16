import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MenuService } from '../../../shared/services/menu/menu.service';
import { FoodType } from '../../../shared/models/FoodType';
import { Food } from '../../../shared/models/Food';
import { Router } from '@angular/router';
import { DialogServiceService } from '../../../shared/services/dialog/dialog-service.service';
import { NewFoodService } from '../../../shared/services/new-food/new-food.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { DeleteService } from '../../../shared/services/delete/delete.service';

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
    private newFoodService: NewFoodService,
    private snackbarService: SnackBarService,
    private deleteService: DeleteService
  ){}

  sort = new FormGroup({
    foodType: new FormControl('0')
  });

  newFood(){
    this.newFoodService.open().then(result => {
      if(result == 'SAVED'){
        this.snackbarService.show("Új termék sikeresen hozzáadva.");
        this.loadFoods();
      }
    });
  }

  deleteFood(food: Food){
    this.deleteService.open(food).then(result => {
      if(result == 'YES'){
        this.service.deleteFood(food).then(() => {
          this.snackbarService.show("Sikeres törlés!");
          this.loadFoods();
        })
        .catch(error => {
          this.snackbarService.show("Sikertelen törlés!");
          console.error(error?.error?.error);
        });
      }
    })
  }

  editFood(food: Food){
    this.foodtypes.forEach(element => {
      if(element.id == food.typeid){
        this.dialogService.open({
          food: food,
          type: element
        }).then(result => {
          if(result == 'UPDATED'){
            this.snackbarService.show("A termék sikeresen frissítve!");
            this.loadFoods();
          }
        })
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

  loadFoods(){
    this.service.getAllFood().subscribe(data => {
        this.foods = data;
    });
  }

  loadFoodTypes(){
    this.service.getFoodTypes().subscribe(data => {
      this.foodtypes = data;
    })
  }

  ngOnInit(): void {
    this.loadFoodTypes();
    this.loadFoods();
  }
}
