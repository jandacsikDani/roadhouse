import { Component } from '@angular/core';
import { PicturegalleryComponent } from '../../components/picturegallery/picturegallery.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PicturegalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}

  navigateToSection(fragment: string){
    this.router.navigate(['/etlap'], {fragment});
  }
}
