import { AfterViewInit, Component } from '@angular/core';
import { food } from './food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-foodmenu',
  imports: [],
  templateUrl: './foodmenu.component.html',
  styleUrl: './foodmenu.component.css'
})
export class FoodmenuComponent implements AfterViewInit{
pizza = food;

constructor(private route: ActivatedRoute){}

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
