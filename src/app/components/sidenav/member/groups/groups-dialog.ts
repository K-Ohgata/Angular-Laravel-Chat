import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/dataType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

type returnData = {
  selectMember: User[],
  roomName: string
}

@Component({
  selector: 'app-groups-dialog',
  templateUrl: './groups-dialog.html',
})
export class GroupsDialogComponent implements OnInit {
  public returnData: returnData = {
    selectMember: [],
    roomName: ''
  }

  constructor(
    public dialogRef: MatDialogRef<GroupsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: User[] },
  ) { }

  ngOnInit(): void {

  }

  addMemberList(value: User): void {
    if (this.returnData.selectMember!.includes(value)) {
      this.returnData.selectMember = this.returnData.selectMember!.filter(item => item !== value)
    } else {
      this.returnData.selectMember!.push(value)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    console.log(this.returnData)
    this.dialogRef.close(this.returnData);
  }
}