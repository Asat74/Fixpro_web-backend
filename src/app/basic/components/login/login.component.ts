import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  validateForm!: FormGroup;
  awitService: any;
  validationm: any;

constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
) {}

ngOnInit() {
    this.validateForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]] 
    });
}

submitForm() {
  const username = this.validateForm.get('username')?.value;
  const password = this.validateForm.get('password')?.value;

  this.authService.login(username, password)
    .subscribe(
      (res: any) => {
        console.log(res);
        if(UserStorageService.isClientLoggedIn()){
          this.router.navigateByUrl('client/dashboard')
        }else if(UserStorageService.isCompanyLoggedIn()){
          this.router.navigateByUrl('company/dashboard')
        }
      },
      (error: any) => {
        this.notification.error(
          'ERROR',
          `Bad credentials`,
          { nzDuration: 5000 }
        );
      }
    );
}


}
