import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isValidated: boolean = false;
  user: User = { firstName: '', lastName: '', phoneNumber: '', email: '', password: '' };
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {

  }

  
  newPassword: string = '';
  returnUrl: string = '';
  error: string = '';
  confirmPassword: string = '';


  
  login(form: NgForm) {
    this.isValidated = true;
  
    // تحقق من صحة النموذج
    if (form.valid) {
      // تحقق مما إذا كان المستخدم موجودًا
      this.userService.checkUserExists(this.user.email).subscribe((exists) => {
        if (exists) {
          // إذا كان المستخدم موجودًا، حاول تسجيل الدخول
          this.authService.login(this.user.email, this.user.password).subscribe(
            (data) => {
              // تحقق مما إذا كانت الاستجابة تحتوي على توكن
              if (data && data.token) {
                // تخزين التوكن في localStorage
                localStorage.setItem('Token', data.token);
                // إعادة توجيه المستخدم إلى الصفحة الرئيسية
                this.router.navigate(['/']);
              } else {
                // إذا لم يكن هناك توكن، فهذا يعني أن كلمة المرور غير صحيحة
                this.error = 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.';
              }
            },
            (error) => {
              // التعامل مع الأخطاء في حال وجودها
              this.error = 'حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.';
            }
          );
        } else {
          // إذا لم يكن المستخدم موجودًا، عرض رسالة خطأ
          this.error = 'البريد الإلكتروني أو اسم المستخدم غير مسجل لدينا.';
        }
      });
    } else {
      this.error = 'يرجى إدخال البريد الإلكتروني واسم المستخدم وكلمة المرور بشكل صحيح.';
    }
  }
  

  resetPassword(form: NgForm) {
    this.isValidated = true;
    
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (form.valid) {
      this.authService.resetPassword(this.user.email).subscribe({
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
