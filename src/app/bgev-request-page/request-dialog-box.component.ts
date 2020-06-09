import { Component, OnInit } from '@angular/core';;
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BgEvConfigService } from 'app/bgev-config-service/bgev-config-service';

@Component({
  selector: 'map-request-dialog-box',
  templateUrl: './request-dialog-box.component.html',
  styleUrls: ['./request-dialog-box.component.scss']
})
export class RequestDialogBoxComponent implements OnInit {
  isLoggedIn: any;
  constructor(private router: Router, public dialogRef: MatDialogRef<RequestDialogBoxComponent>, 
    private _snackBar: MatSnackBar, private configService: BgEvConfigService) { }
  giveRequest() {
    this.isLoggedIn=localStorage.getItem('loggedIn');
    if(this.isLoggedIn=='yes')
    {
      this._snackBar.open('Requested', '', {
        duration: 1500
      });
      this.dialogRef.close();
      /* setTimeout(function () {
        this.router.navigate([`./home`]);
    }, 2000); */
      setTimeout(() => {
        this.router.navigate(['./booking-confirmation']);
        this._snackBar.open('Request Accepted', '', {
          duration: 1500
        });
      }, 2500);
    }
    else
    {
      
      this.configService.setCurrentTab('Login');
      this._snackBar.open('Login to Raise Request', '', {
        duration: 1500
      });
      this.dialogRef.close();      
      this.router.navigate(['./payment']);
    }  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
