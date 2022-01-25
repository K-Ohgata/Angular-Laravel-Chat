import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Chat, User } from 'src/app/dataType';
import { FetchDataService } from 'src/app/service/fetch-data.service';
import { paramIdState } from 'src/app/store/paramId/paramId.reducer';
import { selectRoomId } from 'src/app/store/paramId/paramId.selector';

type displayChat = Chat & {
  userName: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})


export class ChatComponent implements OnInit {
  public roomId: number = 0;
  public roomName: string = "";
  public chats?: displayChat[] = []
  public users?: User[]
  public loginUserId: number = 0;
  public text: string = ""

  constructor(private store: Store<{ paramId: paramIdState }>, private fd: FetchDataService) { }

  ngOnInit(): void {
    this.loginUserId = JSON.parse(sessionStorage.getItem('loginUser_key')!).id 
    this.getChat()
  }

  ngDoCheck(): void {
  }

  getChat() {
    this.store.select(selectRoomId).subscribe(id => {
      this.roomId = id
      this.fd.roomSubject.subscribe(rooms => {
        this.roomName = rooms!.find((room) => room.rid === this.roomId)!.name
      })
      this.fd.chatSubject.subscribe(chats => {
        this.fd.userSubject.subscribe(users => {
          this.chats! = []
          chats!.forEach((chat) => {
            users!.forEach((user) => {
              if (chat.room === this.roomId && chat.messanger === user.id) {
                this.chats!.push({ ...chat, userName: user.name })
              }
            })
          })
        })
      })
    })
  }

  async postChat() {
    if (this.text !== '') {
      await axios.post('http://127.0.0.1:8000/api/chats', {
        sentence: this.text,
        messanger: this.loginUserId,
        room: this.roomId
      })
      this.text = ""
      this.fd.fetchChat()
    }
  }

  async delChat(id:number) {
    let result = window.confirm('削除してよろしいですか？')
    if (result) {
      await axios.delete(`http://127.0.0.1:8000/api/chats/${id}`)
      this.fd.fetchChat()
    }
  }
}
