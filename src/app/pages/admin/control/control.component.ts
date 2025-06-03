import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../shared/services/menu/menu.service';
import { FoodType } from '../../../shared/models/FoodType';
import { Food } from '../../../shared/models/Food';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control',
  imports: [ReactiveFormsModule],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent implements OnInit{
  public foodtypes: FoodType[] = [];
  public foods: Food[] = [];

  constructor(private service: MenuService, private router: Router){}

  sort = new FormGroup({
    foodType: new FormControl('0')
  });

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
