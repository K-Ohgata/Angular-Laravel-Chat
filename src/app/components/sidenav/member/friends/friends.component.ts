import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { statusState } from 'src/app/store/status/status.reducer';
import { selectGrandStatus } from 'src/app/store/status/status.selector';
import { grandTo0, grandTo1 } from 'src/app/store/status/status.actions';
import { setUserId } from 'src/app/store/paramId/paramId.actions';
import { User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import { selectUserId } from 'src/app/store/paramId/paramId.selector';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public grandStatus: Observable<number>;
  public users?: User[]
  public loginUserId: number = 0;
  public userId: number = 0;

  constructor(private store: Store<{ status: statusState }>, private fd: FetchDataService) {
    this.grandStatus = this.store.select(selectGrandStatus);
  }

  ngOnInit(): void {
    this.loginUserId = JSON.parse(sessionStorage.getItem('loginUser_key')!).id
    this.fd.userSubject.subscribe(user => {
      // LoginUser以外でthis.memberにする必要あり
      this.users = user!.filter((user) => {
        return user.id !== this.loginUserId;
      })
    })
  }

  changeGrandTo0() {
    this.store.dispatch(grandTo0())
  }
  changeGrandTo1() {
    this.store.dispatch(grandTo1())
  }

  setUserId(id: number) {
    this.store.dispatch(setUserId({ userId: id }))
    this.store.select(selectUserId).subscribe(id => {
      this.userId = id
    })
  }

}
