import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { statusState } from 'src/app/store/status/status.reducer';
import { selectGrandStatus } from 'src/app/store/status/status.selector';
import { grandTo0,grandTo1 } from 'src/app/store/status/status.actions';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  public grandStatus:Observable<number>;

  constructor(private store: Store<{status:statusState}>) {
    this.grandStatus = this.store.select(selectGrandStatus);
  }

  ngOnInit(): void {
  }

  changeGrandTo0 () {
    this.store.dispatch(grandTo0())
  }
  changeGrandTo1 () {
    this.store.dispatch(grandTo1())
  } 

}
