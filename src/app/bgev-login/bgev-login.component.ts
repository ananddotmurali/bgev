import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import { BgEvConfigService } from '../bgev-config-service/bgev-config-service';

@Component({
    selector: 'bgev-login',
    templateUrl: './bgev-login.component.html',
    styleUrls: ['./bgev-login.component.css']
})
export class BgEvLoginComponent implements OnInit{
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;
    loadComplete = false;
    constructor(private router: Router, private configService: BgEvConfigService) {}

    async login() {

        const user = {
            username: this.email.value,
            password: this.password.value
        }
        try {
            const response = await Auth.signIn(user);
            console.log(response.attributes.profile);
            if (response.attributes.profile === 'ev') {
                this.router.navigate([`./evloggedin`]);
            } else {
                this.router.navigate([`./cploggedin`]);
            }

        } catch (error) {
            alert('Invalid Credentials!!')
        }
        // let owner = login_id.substring(0, 7);
        // if(owner == 'gomathi'){
        // } else if(owner == 'swaroop'){
        //     console.log(owner);
        //     this.router.navigate([`./evloggedin`]);
        // } else {
        //     return false;
        // }
    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    
    getPasswordErrorMsg() {
        return this.password.hasError('required') ? 'Please enter your password' : '';
    }
    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 1500);
    }
    redirectToRegister() {
        this.configService.setCurrentTab('Register');
        this.router.navigate(['./payment']);
    }
}