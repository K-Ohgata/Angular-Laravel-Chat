import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios'
import { FetchDataService } from 'src/app/service/fetch-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public name: string = "";
  public email: string = "";
  public password: string = "";
  public confirm: string = "";
  public errorText?: any = {
    name: "",
    email: "",
    password: "",
    confirm: ""
  };
  public hide: boolean = true
  public hide2: boolean = true

  constructor(private fd: FetchDataService, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {
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

    if (!this.confirm) {
      this.errorText.confirm = 'パスワードを確認して下さい'
    } else if (this.password !== this.confirm) {
      this.errorText.confirm = 'パスワードが一致しません'
      this.confirm = ''
    } else {
      delete this.errorText.confirm
    }

    if (Object.keys(this.errorText).length === 0) {
      this.addUser()
      this.fd.fetchUser()
      this.router.navigate(["/login"]);
    } else {
      alert('signUp error')
    }
  }

  async addUser() {
    await axios.post('https://angular-laravel-chat.herokuapp.com/api/users', {
      name: this.name,
      email: this.email,
      password: this.password
    })
    this.name = "",
      this.email = "",
      this.password = "",
      this.confirm = ""
  }

  login(){
    this.router.navigate(["/login"]);
  }

}
