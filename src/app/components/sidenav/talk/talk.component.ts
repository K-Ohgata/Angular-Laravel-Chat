import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Chat, Room, User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import { setRoomId } from 'src/app/store/paramId/paramId.actions';
import { selectRoomId } from 'src/app/store/paramId/paramId.selector';
import { statusState } from 'src/app/store/status/status.reducer';
import { GroupsDialogComponent } from '../member/groups/groups-dialog';

type displayRoom = Room & {
  numberOfPeople?: number,
  chat?: Chat[]
}

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent implements OnInit {
  public rooms?: displayRoom[] = []
  public member?: User[]
  public selectMember?: User[] = []
  public roomName: string = ""
  public flag: boolean = false;
  public loginUserId: number = 0
  public roomId: number = 0

  constructor(private store: Store<{ status: statusState }>, private fd: FetchDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginUserId = JSON.parse(sessionStorage.getItem('loginUser_key')!).id
    this.store.select(selectRoomId).subscribe(id => {
      this.roomId = id
    })
    this.setMember()
    this.setRooms()
  }
  ngDoCheck(): void {

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
    this.fd.roomSubject.subscribe(rooms => {
      // loginUserが入っているグループの抽出
      this.rooms = rooms!.filter((item: Room) => item.member === this.loginUserId)

      // グループの人数
      let roomIdList = this.rooms.map((room) => { return room.rid })
      for (let i = 0; i < roomIdList.length; i++) {
        let count = rooms!.filter((room) => room.rid === roomIdList[i])
        const people = count.length
        this.rooms[i] = ({ ...this.rooms[i], numberOfPeople: people })
        if (people === 2) {
          this.fd.userSubject.subscribe(users => {
            const friend = count.filter((room) => room.member !== this.loginUserId)[0]
            const match = users!.find((user) => user.id === friend.member)
            this.rooms![i] = ({ ...this.rooms![i], name: match!.name })
          })
        } else if(people === 1){
          this.rooms![i] = ({ ...this.rooms![i], name:'メンバーがいません' })
        }
      }

      // グループのチャット
      this.fd.chatSubject.subscribe(chats => {
        let roomIdList = this.rooms!.map((room) => { return room.rid })
        for (let i = 0; i < roomIdList.length; i++) {
          let chatList: any = []
          chats!.forEach(chat => {
            if (chat.room === roomIdList[i]) {
              chatList.push(chat)
            }
          })
          this.rooms![i] = ({ ...this.rooms![i], chat: chatList })
          chatList = []
        }
      })
      // グループのチャットの時間でthis.rooms並び替えたい
    })
  }

  setRoomId(id: number) {
    this.store.dispatch(setRoomId({ roomId: id }))
    this.store.select(selectRoomId).subscribe(id => {
      this.roomId = id
    })
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

  async delRoom(id: number) {
    let result = window.confirm('退会してよろしいですか？')
    if (result) {
      await axios.delete(`http://127.0.0.1:8000/api/rooms/${id}`)
      this.fd.fetchRoom()
      this.store.dispatch(setRoomId({ roomId: 0 }))
    }
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
