import { Component, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bgev-slider',
    templateUrl: './bgev-slider.component.html',
    styleUrls: ['./bgev-slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BgEvSliderComponent implements AfterViewInit {
    intersectionObserver: IntersectionObserver;
    isDarkTheme = false;    
    currentIndex = 0;
    carousel: Element;
    elements: any = [];
    elementIndices = {};
    slideContents: any = [
        {
            text: "one"
        },
        {
            text: "two"
        },
        {
            text: "three"
        },
        {
            text: "four"
        },
        {
            text: "five"
        },
        {
            text: "six"
        }
    ]

    constructor() {
        this.intersectionObserver = null;
    }

    renderIndicator() {
        return false;
        // this is just an example indicator; you can probably do better
        /* this.indicator.innerHTML = '';
        for (let i = 0; i < this.elements.length; i++) {
            var button = document.createElement('button');
            button.innerHTML = (i === this.currentIndex ? '\u2022' : '\u25e6');
            (function(i) {
            button.onclick = () => {
                this.elements[i].scrollIntoView();
            }
            })(i);
            this.indicator.appendChild(button);
        } */
    }

    ngAfterViewInit() {
        this.intersectionObserver = new IntersectionObserver((entries, observer) => {
            // find the entry with the largest intersection ratio
            let activated = entries.reduce((max, entry) => {
                return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
            });
            if (activated.intersectionRatio > 0) {
                this.currentIndex = this.elementIndices[activated.target.getAttribute("id")];
                
                // this.renderIndicator();
            }
            if(entries[0].isIntersecting) {
                console.log('current index ->', this.currentIndex);
                if(this.currentIndex == ((this.slideContents.length)-1))
                {
                    this.currentIndex = 0;
                }
                
            }
        }, {
            root: this.carousel,
            threshold: 0.5
        });


        this.carousel = document.querySelector('.carousel');
        this.elements = document.querySelectorAll('.carousel > *');
        this.addObserver();
    }

    addObserver() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elementIndices[this.elements[i].getAttribute("id")] = i;
            this.intersectionObserver.observe(this.elements[i]);
        }
    }
}