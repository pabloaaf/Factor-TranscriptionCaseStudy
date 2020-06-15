import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../globals/helpers/http.service';
import { ModelsComponent, User } from "../../../globals/models/models.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  languages = [];

  constructor(private _httpService: HttpService, private router: Router, private formBuilder: FormBuilder, @Inject(LOCALE_ID) public localeId: string) {
      for (let i = 0; i < ModelsComponent.languages.length; i++) {
          this.languages[i] = ModelsComponent.languages[i];
      }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //pattern('')
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.loginForm.controls; }

  verifyUser() {
      this.submitted = true;

      // stop the process here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this._httpService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((data: User) => {
          //console.log(data);
          let auth = Number(data.authlvl);
          if(auth > 0) {
              sessionStorage.setItem('token', data.token);
          }
          if (auth >= 127) {
              this.router.navigate(['professor']);
          } else if (auth >= 63) {
              this.router.navigate(['professor']);
          } else if (auth >= 31) {
              this.router.navigate(['student']);
          } else if (auth >= 1) {
              this.router.navigate(['student']);
          } else if (auth >= 0) {
              this._httpService.getOauth().subscribe((url:string)=> {
                sessionStorage.setItem('pass',this.loginForm.get('password').value);
                window.location.replace(url);
              }, (error: any) => {console.log(error);});
          } else if (auth <= -1) {
              console.log('review pass show alert');
          }
      }, (error: any) => {console.log(error);});
  }

  // ToDo DELETE _____ Ask the API to change the password
  forgotPasswordForm() {
  }

}
