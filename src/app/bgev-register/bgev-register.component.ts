import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bgev-register',
    templateUrl: './bgev-register.component.html',
    styleUrls: ['./bgev-register.component.css']
})
export class BgEvRegisterComponent {
    constructor(private router: Router) {}
    ownerType = 'evowner';
    rippleColor = 'rgba(103, 58, 183, 0.2)';
    redirectToRegister(ownerType: string) {
        this.router.navigate([`./${ownerType}`]);
    }
}