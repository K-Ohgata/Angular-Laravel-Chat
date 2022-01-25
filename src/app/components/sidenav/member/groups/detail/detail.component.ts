import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Room, User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import { paramIdState } from 'src/app/store/paramId/paramId.reducer';
import { selectRoomId } from 'src/app/store/paramId/paramId.selector';
import axios from 'axios';
import { parentTo0 } from 'src/app/store/status/status.actions';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from './detail-dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public roomId: number = 0;
  public rooms?: Room[] = []
  public room?: Room[] = []
  public users?: User[]
  public member?: User[]
  public notMember?: User[] = []
  public selectMember?: User[] = []

  constructor(private store: Store<{ paramId: paramIdState }>, private fd: FetchDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fd.fetchRoom()
  }

  ngDoCheck(): void {
    this.getRoom()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '250px',
      data: { member: this.notMember},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectMember = result;
      this.addMember()
    });
  }


  getRoom() {
    this.store.select(selectRoomId).subscribe(id => {
      this.roomId = id
      this.fd.roomSubject.subscribe(rooms => {
        this.rooms = rooms!
        this.member = []
        this.notMember = []
        this.room = rooms!.filter(room => room.rid === this.roomId)
        this.fd.userSubject.subscribe(users => {
          this.users = users!
          let copy = this.users!.slice()
          this.room!.forEach((room: Room) => {
            this.users!.forEach((user: User) => {
              if (room.member === user.id) {
                this.member!.push(user)
                copy.splice(copy.indexOf(user), 1)
              }
            })
          })
          this.notMember = copy
        })
      })
    });
  }

  jumpTalk() {
    this.store.dispatch(parentTo0())
  }

  addMemberList(value: User): void {
    if (this.selectMember!.includes(value)) {
      this.selectMember = this.selectMember!.filter(item => item !== value)
    } else {
      this.selectMember!.push(value)
    }
  }

  async postRooms(member: User) {
    await axios.post('https://angular-laravel-chat.herokuapp.com/api/rooms', {
      rid: this.room![0].rid,
      name: this.room![0].name,
      member: member.id,
    })
    this.fd.fetchRoom()
  }

  addMember() {
    // 選択されたメンバーをDBのRooms(member=uid)に追加
    this.selectMember!.forEach((member: User) => {
      this.postRooms(member)
    })
    this.selectMember = []
  }
}

