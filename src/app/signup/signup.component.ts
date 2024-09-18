import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = { firstName: '', lastName: '', phoneNumber: '', email: '', password: '' };
  isValidated: boolean = false; 
  isTermsChecked: boolean = false;
  confirmPassword: string = '';
  userExists: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit(): void {}

  get passwordHasMinLength(): boolean {
    return this.user.password.length >= 8;
  }

  get passwordHasUppercase(): boolean {
    return /[A-Z]/.test(this.user.password);
  }

  get passwordHasLowercase(): boolean {
    return /[a-z]/.test(this.user.password);
  }

  get passwordHasNumber(): boolean {
    return /\d/.test(this.user.password);
  }

  get passwordHasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.user.password);
  }

  get passwordValidationMessages(): string[] {
    const messages = [];
    if (!this.passwordHasMinLength) messages.push('Password must be at least 8 characters long.');
    if (!this.passwordHasUppercase) messages.push('Password must contain at least one uppercase letter.');
    if (!this.passwordHasLowercase) messages.push('Password must contain at least one lowercase letter.');
    if (!this.passwordHasNumber) messages.push('Password must contain at least one number.');
    if (!this.passwordHasSpecialChar) messages.push('Password must contain at least one special character.');
    return messages;
  }

  onSubmit(form: NgForm): void {
    this.isValidated = true;
    this.userExists = false;

    if (form.valid && this.isTermsChecked && this.user.password === this.confirmPassword &&
        this.passwordHasMinLength && this.passwordHasUppercase &&
        this.passwordHasLowercase && this.passwordHasNumber && this.passwordHasSpecialChar) {

      this.userService.checkUserExists(this.user.email).subscribe(exists => {
        if (exists) {
          this.userExists = true; 
        } else {
          this.userService.addUser(this.user).subscribe(() => {
            this.router.navigate(['/']);
          });
        }
      });
    } else {
      console.warn('Form is invalid, terms are not accepted, or passwords do not match');
    }
  }
}