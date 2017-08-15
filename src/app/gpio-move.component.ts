import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector: 'gpio-move',
    templateUrl: './gpio-move.component.html',
    styleUrls: ['./gpio-move.component.css']
})
export class GPIOMoveComponent implements OnInit {
    @Input() direction: string;
    @ViewChild('gpioMove') elementRef: ElementRef;

    constructor() { }

    OnClick(): void {
        alert('click');
    }

    sendCommand(): void {
        //this.gpioService.sendCommand(this.direction);
    }

    ngOnInit(): void {
        const cssClass = `gpio-move-${this.direction}`;
        this.elementRef.nativeElement.setAttribute('class', cssClass);
    }
}
