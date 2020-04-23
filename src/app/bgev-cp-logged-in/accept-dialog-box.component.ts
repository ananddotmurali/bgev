import { Component, OnInit } from '@angular/core';;
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BgEvConfigService } from 'app/bgev-config-service/bgev-config-service';

@Component({
  selector: 'cp-accept-dialog-box',
  templateUrl: './accept-dialog-box.component.html',
  styleUrls: ['./accept-dialog-box.component.scss']
})
export class AcceptDialogBoxComponent implements OnInit {
  isLoggedIn: any;
  constructor(private router: Router, public dialogRef: MatDialogRef<AcceptDialogBoxComponent>, 
    private _snackBar: MatSnackBar, private configService: BgEvConfigService) { }
    // requestHandler(actionType: any, index: number){
    //   if(actionType == 'Accepted') {
    //       this.requests[index]['isAccepted'] = true;
    //       setTimeout(() => {
    //           this.requests[index]['chargeComplete'] = true;
    //       }, 2500);
    //   }
    //   else if(actionType == 'Rejected')
    //   { 
    //       this.icon = 1;
    //       this.requests.splice(index, 1);
    //       this._snackBar.open(`Request ${actionType}`, '', {
    //       duration: 2000
    //   });
    //    } 
    // }
  
  proceed() {
    return true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
