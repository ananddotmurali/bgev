import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-request-dialog-box',
  templateUrl: './request-dialog-box.component.html',
  styleUrls: ['./request-dialog-box.component.css']
})
export class RequestDialogBoxComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RequestDialogBoxComponent>) { }
  giveRequest(){
  //   this._snackBar.open('Requested', '', {
  //     duration: 3000
  // });
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
