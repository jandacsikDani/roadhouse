import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isTokenExpired } from '../../../../api/src/utils/token.utils';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  errorMessage: string = "";
  loginGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authService: AuthService){}
  
  login(){
    if(this.loginGroup.invalid){
      alert("Üres mezők!");
      return;
    }

    const username = this.loginGroup.get('username')?.value || '';
    const password = this.loginGroup.get('password')?.value || '';

    this.authService.login(username, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedIn', "true");
        this.router.navigate(['/admin/control']);
      },
      error: (err) => {
        if(err.status === 401){
          this.errorMessage = "Hibás felhasználónév vagy jelszó!";
        }else{
          this.errorMessage = "Ismeretlen hiba történt. Próbáld újra.";
        }
      }
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token && !isTokenExpired(token)){
      this.router.navigate(['/admin/control']);
    }
  }
}
