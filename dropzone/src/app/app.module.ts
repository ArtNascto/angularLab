import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxFilesizeModule } from 'ngx-filesize';
import { CommonModule } from '@angular/common';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
@NgModule({
  declarations: [AppComponent, DropzoneComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    NgxFilesizeModule,
    CommonModule,
    SatPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
