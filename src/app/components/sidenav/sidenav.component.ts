import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { statusState } from 'src/app/store/status/status.reducer';
import { selectParentStatus, selectGrandStatus } from 'src/app/store/status/status.selector';
import { parentTo0, parentTo1, grandTo0, grandTo1 } from 'src/app/store/status/status.actions';
import { FetchDataService } from 'src/app/service/fetch-data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  public parentStatus: Observable<number>;
  public grandStatus: Observable<number>;

  constructor(private store: Store<{ status: statusState }>, private fd: FetchDataService) {
    this.parentStatus = this.store.select(selectParentStatus);
    this.grandStatus = this.store.select(selectGrandStatus);
  }
  
  
  ngOnInit(): void {

  }

  changeParentTo0() {
    this.store.dispatch(parentTo0())
  }
  changeParentTo1() {
    this.store.dispatch(parentTo1())
  }
  changeGrandTo0() {
    this.store.dispatch(grandTo0())
  }
  changeGrandTo1() {
    this.store.dispatch(grandTo1())
  }
}
