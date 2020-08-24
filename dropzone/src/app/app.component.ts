import { Component, ViewChild } from '@angular/core';
import { DropzoneComponent } from './dropzone/dropzone.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild(DropzoneComponent) dropzone;
  uploadFile($event) {
    console.log({ event: $event });
  }
  deleteFile($event) {
    console.log({ event: $event });
  }
}
