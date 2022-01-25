import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from './service/fetch-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private fd: FetchDataService,private router: Router) {}

  ngOnInit(): void {
    this.fd.fetchUser()
    this.fd.fetchRoom()
    this.fd.fetchChat()
    this.router.navigate(["/login"]);
  }


}
