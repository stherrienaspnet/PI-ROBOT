import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {GPIOService} from './gpio-service';
import {ActionType, ColorType, MessageType,} from './gpio.model';

@Component({
  selector: 'gpio-move',
  templateUrl: './gpio-move.component.html',
  styleUrls: ['./gpio-move.component.css']
})
export class GPIOMoveComponent implements OnInit {
  @Input() action: string;
  @Input() enable:boolean;
  @ViewChild('gpioMove') elementRef: ElementRef;
  fillColor: string;

  private actionType: string;


  private onAction = (messageType: string, actionType: string) => {
    if (messageType != MessageType.RESPONSE) return;
    const isActive: boolean = actionType == this.actionType;
    this.fillColor = isActive ? ColorType.ACTIVE_COLOR : ColorType.UNACTIVE_COLOR;
  };

  constructor(private gpioService: GPIOService) {
    gpioService.addListener('onAction', this.onAction);
  }

  commandDevice(): void {
    if (this.enable == null || !this.enable) return;
    this.gpioService.commandDevice(this.actionType);
  }

  ngOnInit(): void {
    this.actionType = ActionType.resolve(this.action);
    this.fillColor = ColorType.UNACTIVE_COLOR;
    const cssClass: string = `gpio-${this.actionType.replace('_', '-').toLowerCase()}`;
    this.elementRef.nativeElement.setAttribute('class', cssClass);
  }
}
