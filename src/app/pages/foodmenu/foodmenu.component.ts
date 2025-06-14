import { AfterViewInit, Component, OnInit } from '@angular/core';
import { food } from './food';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../shared/services/menu/menu.service';
import { FoodType } from '../../shared/models/FoodType';
import { Food } from '../../shared/models/Food';

@Component({
  selector: 'app-foodmenu',
  imports: [],
  templateUrl: './foodmenu.component.html',
  styleUrl: './foodmenu.component.css'
})
export class FoodmenuComponent implements AfterViewInit, OnInit{
pizza = food;
foodTypes: FoodType[] = [];
foods: Food[] = [];

constructor(private route: ActivatedRoute, private menuService: MenuService){}

ngOnInit(): void {
  this.menuService.getFoodTypes().subscribe(data => {
    this.foodTypes = data;
  });
  this.menuService.getAllFood().subscribe(data => {
    this.foods = data;
  });
}

ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if(fragment){
        const el = document.getElementById(fragment);
        if(el){
          el.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
}
}
