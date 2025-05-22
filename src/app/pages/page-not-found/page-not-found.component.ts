import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.navigate(['/']);
  }
}
