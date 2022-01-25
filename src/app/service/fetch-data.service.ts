import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User, Room, Chat } from '../dataType';
import { Router } from '@angular/router';
import axios from 'axios';
import { Store } from '@ngrx/store';
import { statusState } from '../store/status/status.reducer';
import { selectLoginUser } from '../store/paramId/paramId.selector';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  public userSubject = new BehaviorSubject<User[] | null>(null);
  public roomSubject = new BehaviorSubject<Room[] | null>(null);
  public chatSubject = new BehaviorSubject<Chat[] | null>(null);

  constructor(private store: Store<{ status: statusState }>) {}

  async fetchUser() {
    const res = await axios.get('http://127.0.0.1:8000/api/users')
    const data = res.data
    this.userSubject.next(data)
  }
  async fetchRoom() {
    const res = await axios.get('http://127.0.0.1:8000/api/rooms')
    this.roomSubject.next(res.data)
    // setTimeout(()=>this.fetchRoom(),3000)
  }
  async fetchChat() {
    const res = await axios.get('http://127.0.0.1:8000/api/chats')
    const data = res.data
    this.chatSubject.next(data)
    setTimeout(()=>this.fetchChat(),3000)
  }

}
