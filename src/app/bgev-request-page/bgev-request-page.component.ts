import {Component, OnInit} from '@angular/core';
import { BgEvService } from 'app/shared/bgev.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BgEvConfigService } from '../bgev-config-service/bgev-config-service';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogBoxComponent } from '../bgev-request-page/request-dialog-box.component';


@Component({
    selector: 'bgev-request-page',
    templateUrl: 'bgev-request-page.component.html',
    styleUrls: ['bgev-request-page.component.scss']
})

export class BgEvRequestPageComponent implements OnInit{
    chargePointDetails: any = [ ]
    loginType: string;
    isLoggedIn: boolean;
    amenities: any = [];
    rating = 0;
    utilization = 0;
    chargerType = 'CCA';
    price = '20';
    constructor(private bgevservice: BgEvService, private router: Router,
        private location: Location, private _snackBar: MatSnackBar, private configService: BgEvConfigService, public dialog: MatDialog) {
        this.loginType = localStorage.getItem('loginType');
        this.isLoggedIn = localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'yes';
    }
    ngOnInit(): void {
        this.bgevservice.currentData.subscribe(data => {
            if (data.length === 0) {
                this.router.navigate(['./home']);
                return false;
            }
            this.chargePointDetails = data;
            this.chargerType = localStorage.getItem('chargerType')
            this.price = localStorage.getItem('price')
            this.amenities = this.configService.getAvailableAmenities();
            this.rating = Math.floor(Math.random() * (5 - 1) + 1);
            this.utilization = Math.floor(Math.random() * (10 - 1) + 1);
        });
    }

    goBack() {
        this.location.back();
    }

    requested() {
        if(this.isLoggedIn) {
            this.openDialog();
            // this.router.navigate(['./payment']);
        } else {
            this.configService.setCurrentTab('Login');
            this._snackBar.open('Please Login to request.', '', {
                duration: 2000
            });
            this.router.navigate(['./payment']);
        }       
    }

    openDialog() {
        const dialogRef = this.dialog.open(RequestDialogBoxComponent, {
            width: '400px'
        });
    }

}