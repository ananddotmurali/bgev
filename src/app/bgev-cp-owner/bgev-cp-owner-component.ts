import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from 'aws-amplify';

@Component({
    selector: 'bgev-cp-owner',
    templateUrl: './bgev-cp-owner-component.html',
    styleUrls: ['./bgev-cp-owner-component.scss']
})
export class BgCpOwnerComponent implements OnInit {
    loadComplete = false;
    amenities = [{'icon_name': 'Store', 'icon': 'shopping_cart'},
    {'icon_name': 'Cafe', 'icon': 'local_cafe'},
    {'icon_name': 'Hospital', 'icon': 'local_hospital'},
    {'icon_name': 'Restaurant', 'icon': 'local_dining'},
    {'icon_name': 'Parking', 'icon': 'local_parking'},
    {'icon_name': 'Rest Room', 'icon': 'wc'},
    {'icon_name': 'Children Area', 'icon': 'child_care'},
    {'icon_name': 'Car Wash', 'icon': 'local_car_wash'},
    {'icon_name': 'Car Service', 'icon': 'build'},
    {'icon_name': 'ATM', 'icon': 'atm'}];

    containers = [1];

    @ViewChild('dynamic', {
        read: ViewContainerRef
      }) viewContainerRef: ViewContainerRef

    constructor(private router: Router, private _snackBar: MatSnackBar) {}
    async registerUser(name: string, mobile: string, email: string) {
        const user = {
            username: email,
            password: 'test@123',
            attributes: {
                nickname: name,
                name: name,
                profile: 'cp',
                 email,
                 gender: 'Male',
                 phone_number: mobile,
                 birthdate: '2000-01-01'
               }
         }
         try {
             const data = await Auth.signUp(user);
             console.log('userConfirmation::', data.userConfirmed);

         } catch (error) {
            if (JSON.stringify(error).includes('UsernameExistsException')) {
                alert('Name already exists!')
            }
         }
        // this._snackBar.open('Registered Successfully. Please Login to Continue', '', {
        //     duration: 3000
        // });
        this.router.navigate(['login']);
    }

    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 2500)
    }
    addConnector() {
        this.containers.push(this.containers.length + 1)
    }
}
