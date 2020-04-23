import {Component, OnInit} from '@angular/core';
import { BgEvService } from 'app/shared/bgev.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BgEvConfigService } from '../bgev-config-service/bgev-config-service';


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
    constructor(private bgevservice: BgEvService, private router: Router, private location: Location, private _snackBar: MatSnackBar, private configService: BgEvConfigService) {
        this.loginType = localStorage.getItem('loginType');
        this.isLoggedIn = localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'yes';        
    }
    ngOnInit(): void {
        this.bgevservice.currentData.subscribe(data => {
            console.log('data++++++++');
            console.log(data);
            if(data.length === 0) {
                this.router.navigate(['./home']);
                return false;
            }
            this.chargePointDetails = data;
            this.amenities = this.configService.getAvailableAmenities();

        });
    }

    goBack() {
        this.location.back();
    }

    requested() {
        if(this.isLoggedIn) {
            this.router.navigate(['./payemnt']);
        } else {
            this._snackBar.open('Please Login to request.', '', {
                duration: 2000
            });
        }       
    }

}