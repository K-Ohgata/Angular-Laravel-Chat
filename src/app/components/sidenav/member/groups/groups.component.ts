import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { statusState } from 'src/app/store/status/status.reducer';
import { setRoomId } from 'src/app/store/paramId/paramId.actions';
import { Room, User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import axios from 'axios';
import { selectRoomId } from 'src/app/store/paramId/paramId.selector';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsDialogComponent } from './groups-dialog';
import { parentTo0 } from 'src/app/store/status/status.actions';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  public rooms?: Room[] = []
  public member?: User[]
  public selectMember?: User[] = []
  public roomName: string = ""
  public loginUserId: number = 0
  public roomId: number = 0

  constructor(private store: Store<{ status: statusState }>, private fd: FetchDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginUserId = JSON.parse(sessionStorage.getItem('loginUser_key')!).id
    this.setRooms()
    this.setMember()
  }

  ngDoCheck(): void {
    this.rooms = []
    this.setRooms()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GroupsDialogComponent, {
      width: '250px',
      data: { member: this.member },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectMember = result.selectMember;
      this.roomName = result.roomName;
      this.addRoom()
    });
  }

  setRooms() {
    let allRoom: Room[] = []
    let myRoom: Room[] = []
    this.fd.roomSubject.subscribe(room => {
      allRoom = room!
      myRoom = room!.filter((item: Room) => item.member === this.loginUserId)
    })
    let roomIdList = myRoom.map((room) => { return room.rid })
    for (let i = 0; i < roomIdList.length; i++) {
      let count = allRoom!.filter((room) => room.rid === roomIdList[i]).length
      if (count > 2) {
        this.rooms!.push(myRoom[i])
      }
    }
  }
  setMember() {
    this.fd.userSubject.subscribe(user => {
      const userList = user!
      // LoginUser以外でthis.memberにする必要あり
      this.member = userList.filter((user) => {
        return user.id !== this.loginUserId;
      })
    })
  }

  setRoomId(id: number) {
    this.store.dispatch(setRoomId({ roomId: id }))
    this.store.select(selectRoomId).subscribe(id => {
      this.roomId = id
    })
  }

  async addRoom() {
    // 1回postしてroom.rid生成する必要あり
    await axios.post('http://127.0.0.1:8000/api/rooms', {
      name: this.roomName,
      member: this.loginUserId
    }).then((res) => {
      this.selectMember!.forEach((user: User) => {
        this.addMember(res.data, user)
      })
    })
    this.selectMember = []
  }
  
  async addMember(room: Room, member: User) {
    await axios.post('http://127.0.0.1:8000/api/rooms', {
      rid: room!.rid,
      name: this.roomName,
      member: member.id
    })
    this.fd.fetchRoom()
  }

}

