import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {GPIOStatusComponent} from './gpio-status.component';
import {GPIOStopComponent} from './gpio-stop.component';
import {GPIOMoveComponent} from './gpio-move.component';
import {GPIOService} from './gpio-service';

@NgModule({
  declarations: [
    AppComponent,
    GPIOMoveComponent,
    GPIOStopComponent,
    GPIOStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GPIOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
