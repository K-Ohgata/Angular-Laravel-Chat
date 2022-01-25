import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/dataType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.html',
})
export class DetailDialogComponent implements OnInit {
  public selectMember:User[]= []


  constructor(
    public dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: User[] },
  ) { }

  ngOnInit(): void {

  }

  addMemberList(value: User): void {
    if (this.selectMember!.includes(value)) {
      this.selectMember = this.selectMember!.filter(item => item !== value)
    } else {
      this.selectMember!.push(value)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    console.log(this.selectMember)
    this.dialogRef.close(this.selectMember);
  }
}