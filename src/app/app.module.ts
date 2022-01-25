import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MemberComponent } from './components/sidenav/member/member.component';
import { TalkComponent } from './components/sidenav/talk/talk.component';
import { FriendsComponent } from './components/sidenav/member/friends/friends.component';
import { GroupsComponent } from './components/sidenav/member/groups/groups.component';
import { ProfileComponent } from './components/sidenav/member/friends/profile/profile.component';
import { DetailComponent } from './components/sidenav/member/groups/detail/detail.component';
import { ChatComponent } from './components/sidenav/talk/chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { statusReducer } from './store/status/status.reducer';
import { paramIdReducer } from './store/paramId/paramId.reducer';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list'
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { GroupsDialogComponent } from './components/sidenav/member/groups/groups-dialog';
import { DetailDialogComponent } from './components/sidenav/member/groups/detail/detail-dialog';


const appRoutes: Routes = [
  { path: '', component: SidenavComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SidenavComponent,
    MemberComponent,
    TalkComponent,
    FriendsComponent,
    GroupsComponent,
    GroupsDialogComponent,
    ProfileComponent,
    DetailComponent,
    DetailDialogComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    StoreModule.forRoot({ status: statusReducer,paramId:paramIdReducer}),
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
  entryComponents: [
    GroupsDialogComponent,
    DetailDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
