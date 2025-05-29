import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  isMenuOpen: boolean = false;
  windowWith: number = window.innerWidth

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu(): void {
    const menu = document.getElementById("mobile_menu") as HTMLElement;
    menu.style.height = "calc(4 * 40px)";

    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`nav_btn${i}`) as HTMLElement;
      btn.style.height = "40px";
      btn.style.borderBottom = "1px solid var(--secondary_color)";
    }

    setTimeout(() => {
      for (let i = 1; i <= 3; i++) {
        const cover = document.getElementById(`menuCover${i}`) as HTMLElement;
        cover.style.width = "0";
      }
    }, 600);
  }

  closeMenu(): void {
    const menu = document.getElementById("mobile_menu") as HTMLElement;
    menu.style.height = "40px";

    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`nav_btn${i}`) as HTMLElement;
      btn.style.height = "0";
      btn.style.border = "none";

      const cover = document.getElementById(`menuCover${i}`) as HTMLElement;
      cover.style.width = "100%";
    }
  }

  selectPage(): void{
    this.isMenuOpen = false;
    if(this.windowWith < 900){
      this.closeMenu();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void{
    this.windowWith = window.innerWidth;
    this.closeMenu();
  }

  externalSite(){
    window.open("https://www.megalloetterem.com/", "_self");
  }
}
