import {Component, Input, OnInit} from '@angular/core';
import {ActionType, ColorType, MessageType} from './gpio.model';
import {GPIOService} from './gpio-service';

@Component({
  selector: 'gpio-stop',
  templateUrl: './gpio-stop.component.html',
  styleUrls: ['./gpio-stop.component.css']
})
export class GPIOStopComponent implements OnInit {
  @Input() enable: boolean;

  fillColor: string;

  constructor(private gpioService: GPIOService) {
    gpioService.addListener('onAction', this.onAction);
  }

  private onAction = (messageType: string, actionType: string) => {
    if (messageType != MessageType.RESPONSE) return;
    const isActive: boolean = actionType == ActionType.STOP;
    this.fillColor = isActive ? ColorType.ACTIVE_COLOR : ColorType.UNACTIVE_COLOR;
  };

  commandDevice(): void {
    if (this.enable == null || !this.enable) return;
    this.gpioService.commandDevice(ActionType.STOP);
  }

  ngOnInit(): void {
    this.fillColor = ColorType.UNACTIVE_COLOR;
  }
}
