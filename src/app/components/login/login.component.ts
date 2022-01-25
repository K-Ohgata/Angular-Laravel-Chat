import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import { setLoginUser } from 'src/app/store/paramId/paramId.actions';
import { statusState } from 'src/app/store/status/status.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public users?: User[]
  public name: string = "";
  public email: string = "";
  public password: string = "";
  public errorText?: any = {
    name: "",
    email: "",
    password: "",
  };
  public loginError:string=""
  public hide:boolean=true

  constructor(private store: Store<{ status: statusState }>, private fd: FetchDataService, private router: Router) { }

  ngOnInit(): void {
    this.fd.fetchUser()
    this.fd.userSubject.subscribe(user =>
      this.users = user!
    )
    if(sessionStorage.getItem('loginUser_key')){
      this.router.navigate(["/"]);
    }
  }

  login() {
    const mail = (/^[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9._-]+$/)

    if (!this.name) {
      this.errorText.name = '名前を入力して下さい'
    } else {
      delete this.errorText.name
    }

    if (!this.email) {
      this.errorText.email = 'メールアドレスを入力して下さい'
    } else if (!mail.test(this.email)) {
      this.errorText.email = 'メールアドレスはxxx@xxx.xxxの形式で入力して下さい'
      this.email = ''
    } else {
      delete this.errorText.email
    }

    if (!this.password) {
      this.errorText.password = 'パスワードを入力して下さい'
    } else {
      delete this.errorText.password
    }

    if (Object.keys(this.errorText).length === 0) {
      for(let i=0;i<this.users!.length;i++){
        if (this.users![i].name === this.name && this.users![i].email === this.email && this.users![i].password === this.password) {
          this.loginError = ""
          this.router.navigate(["/"]);
          this.store.dispatch(setLoginUser({ loginUser: this.users![i] }))
          sessionStorage.removeItem('loginUser_key');
          sessionStorage.setItem('loginUser_key', JSON.stringify(this.users![i]));
          break;
        } else {
          this.loginError = "Login error"
        }       
      }
      if(this.loginError){
        alert(this.loginError)
      }
    }
  }
  
  signup(){
    this.router.navigate(["/signup"]);
  }

}
