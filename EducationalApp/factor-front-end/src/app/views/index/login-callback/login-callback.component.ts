import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from '../../../globals/helpers/http.service';
import { User } from "../../../globals/models/models.component";

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent implements OnInit {

  constructor(private _httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  	let password = sessionStorage.getItem('pass');
    sessionStorage.removeItem('pass');
      //console.log(this.route.snapshot.params.code);
      //console.log(this.route.snapshot.paramMap.get('code'));
    //this.route.snapshot.params.code
    this.route.queryParamMap.subscribe((p: any) => {
      // console.log(p.params);
      this._httpService.callback(p.params.code, password).subscribe((data: User) => { // p.params.code
        sessionStorage.setItem('token', data.token); //JSON.parse(atob(data.token.split('.')[1]))
        let auth = Number(data.authlvl);
        if (auth >= 127) {
          this.router.navigate(['professor']);
        } else if (auth >= 63) {
          this.router.navigate(['professor']);
        } else if (auth >= 31) {
          this.router.navigate(['student']);
        } else if (auth >= 1) {
          this.router.navigate(['student']);
        }
      }, (error: any) => {console.log(error);});
    },err=>{console.log(err)});
  }

}
