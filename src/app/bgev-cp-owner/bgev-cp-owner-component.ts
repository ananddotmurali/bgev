import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from 'aws-amplify';
import { FormControl, Validators } from '@angular/forms';
import { BgevMapService } from '../shared/bgev-map-service'


@Component({
    selector: 'bgev-cp-owner',
    templateUrl: './bgev-cp-owner-component.html',
    styleUrls: ['./bgev-cp-owner-component.scss']
})
export class BgCpOwnerComponent implements OnInit {
    username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    mobile = new FormControl('',[Validators.required]);
    mail = new FormControl('', [Validators.required, Validators.email]);
    new_password = new FormControl('',[Validators.required, Validators.minLength(8)]);
    confirm_password = new FormControl('',[Validators.required, Validators.minLength(8)]);
    price = new FormControl('', [Validators.required])
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
    location: any;
    latitude: any;
    longitude: any;

    constructor(private router: Router, private _snackBar: MatSnackBar, private mapService: BgevMapService) {}

    getUsernameErrorMessage() {
        return this.username.hasError('required') ? 'You must enter a value' :
            this.username.hasError('minlength') ? 'Should be atleast 4 characters long' :
                '';
    }

    getMobileErrorMessage() {
        return this.mobile.hasError('required') ? 'You must enter a value' : '';
    }

    getMailErrorMessage() {
        return this.mail.hasError('required') ? 'You must enter a value' :
        this.mail.hasError('email') ? 'Not a valid email' :
            '';
    }

    getPasswordErrorMessage() {
        return this.new_password.hasError('required') ? 'You must enter a value' :
            this.new_password.hasError('minlength') ? 'Should be atleast 8 characters long' : '';
    }

    getConfirmPasswordErrorMessage(){
        return this.confirm_password.hasError('required') ? 'You must enter a value' :
            this.confirm_password.hasError('minlength') ? 'Should be atleast 8 characters long' : '';
    }

    getPriceErrorMessage() {
        return this.price.hasError('required') ? 'You must enter a value' : '';
    }

    async registerUser() {
        const user = {
            username: this.mail.value,
            password: this.new_password.value,
            attributes: {
                nickname: name,
                name: name,
                profile: 'cp',
                 email: this.mail.value,
                 gender: 'Male',
                 phone_number: this.mobile.value,
                 birthdate: '2000-01-01'
               }
         }
         try {
             const data = await Auth.signUp(user);
             console.log('userConfirmation::', data.userConfirmed);
             this._snackBar.open('Registered Successfully. Please Login to Continue', '', {
                 duration: 1500
             });
             this.router.navigate(['login']);

         } catch (error) {
            if (JSON.stringify(error).includes('UsernameExistsException')) {
                alert('Name already exists!')
            }
         }
    }

   /*  ngAfterViewInit() {
        
    } */

    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 2500)
        const coords = new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(( position ) => {
            resolve(position.coords)
    
        })
        })
        this.getlocation(coords);
    }
    addConnector() {
        this.containers.push(this.containers.length + 1)
    }

    async getlocation(coords) {
        const coordinates = await coords;
        const response  = await this.mapService.getAddressFromLatLng(`${coordinates.latitude}, ${coordinates.longitude}`);
        this.location = response[0].Location.Address.Label;
        this.setLatLongitude(response[0].Location.DisplayPosition)
    }

    setLatLongitude(position) {
        this.latitude = position.Latitude;
        this.longitude = position.Longitude;
    }
}
