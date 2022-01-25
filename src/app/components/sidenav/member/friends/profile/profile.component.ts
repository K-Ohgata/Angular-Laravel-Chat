import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Room, User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import { setRoomId } from 'src/app/store/paramId/paramId.actions';
import { paramIdState } from 'src/app/store/paramId/paramId.reducer';
import { selectUserId } from 'src/app/store/paramId/paramId.selector';
import { parentTo0 } from 'src/app/store/status/status.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userId: number = 0;
  public user?: User[]
  public rooms?: Room[] = []
  public loginUserId: number = 0

  constructor(private store: Store<{ paramId: paramIdState }>, private fd: FetchDataService) {
  }

  ngOnInit(): void {
    this.loginUserId = JSON.parse(sessionStorage.getItem('loginUser_key')!).id
    this.getUser()
    this.setRooms()
  }
  getUser() {
    this.store.select(selectUserId).subscribe(id => {
      this.userId = id
      this.fd.userSubject.subscribe(users => {
        if (this.userId) {
          this.user = users!.filter(user => user.id === this.userId)
        }
      })
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
      let count = allRoom!.filter((room) => room.rid === roomIdList[i])
      if (count.length === 2) {
        let pickup = count.find((item: Room) => item.member !== this.loginUserId)
        this.rooms!.push(pickup!)
      }
    }
  }

  jumpTalk() {
    const match = this.rooms!.find((room)=>room.member === this.userId)
    if(match){
      this.store.dispatch(setRoomId({ roomId: match.rid }))
      this.store.dispatch(parentTo0())
    } else {
      this.newRoom()
      this.store.dispatch(parentTo0())
    }
  }

  async newRoom() {
    await axios.post('http://127.0.0.1:8000/api/rooms', {
      member: this.loginUserId
    }).then((res) => {
      this.addMember(res.data)
      this.store.dispatch(setRoomId({ roomId: res.data.rid }))
    })
  }
  async addMember(room:Room) {
    await axios.post('http://127.0.0.1:8000/api/rooms', {
      rid:room.rid,
      member: this.userId
    })
    this.fd.fetchRoom()
  }
}
