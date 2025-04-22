import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'roadhouse';
  isMenuOpen: boolean = false;

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
    menu.style.height = "calc(6 * 40px)";

    for (let i = 1; i <= 3; i++) {
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

    for (let i = 1; i <= 3; i++) {
      const btn = document.getElementById(`nav_btn${i}`) as HTMLElement;
      btn.style.height = "0";
      btn.style.border = "none";

      const cover = document.getElementById(`menuCover${i}`) as HTMLElement;
      cover.style.width = "100%";
    }
  }
}
