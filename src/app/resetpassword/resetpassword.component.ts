import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  isValidated: boolean = false;
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  resetPassword(form: NgForm) {
    this.isValidated = true;
    
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (form.valid) {
      this.authService.resetPassword(this.email).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = 'Failed to reset password. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.error = 'Please fill out the form correctly.';
    }
  }
}