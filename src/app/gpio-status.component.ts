import {Component, Input, OnInit} from '@angular/core';
import {GPIOService} from './gpio-service';
import {ActionType, ColorType, MessageType} from './gpio.model';

@Component({
  selector: 'gpio-status',
  templateUrl: './gpio-status.component.html',
  styleUrls: ['./gpio-status.component.css']
})
export class GPIOStatusComponent implements OnInit {
  @Input() enable:boolean;
  gpio2Color: string;
  gpio3Color: string;
  gpio4Color: string;
  gpio5Color: string;

  private onAction = (messageType: string, actionType: string) => {
    if (messageType != MessageType.RESPONSE) return;
    this.gpio2Color = actionType == ActionType.MOVE_FORWARD? ColorType.ENERGIZE_COLOR: ColorType.UNENERGIZE_COLOR;
    this.gpio3Color = actionType == ActionType.MOVE_REVERSE? ColorType.ENERGIZE_COLOR: ColorType.UNENERGIZE_COLOR;
    this.gpio4Color = actionType == ActionType.MOVE_LEFT? ColorType.ENERGIZE_COLOR: ColorType.UNENERGIZE_COLOR;
    this.gpio5Color = actionType == ActionType.MOVE_RIGHT? ColorType.ENERGIZE_COLOR: ColorType.UNENERGIZE_COLOR;
  };

  constructor(private gpioService: GPIOService) {

  }

  ngOnInit(): void {
    this.gpio2Color = ColorType.UNENERGIZE_COLOR;
    this.gpio3Color = ColorType.UNENERGIZE_COLOR;
    this.gpio4Color = ColorType.UNENERGIZE_COLOR;
    this.gpio5Color = ColorType.UNENERGIZE_COLOR;

    this.gpioService.addListener('onAction', this.onAction);
  }
}
