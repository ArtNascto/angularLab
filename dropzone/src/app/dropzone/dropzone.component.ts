import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import * as Dropzone from 'dropzone';
import { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'dropzone-container',
  template: `
    <div #dropzone>
      <div
        id="{{ _dropzoneId }}"
        [ngClass]="{
          'drop-without-files': !dropFiles || dropFiles.length === 0,
          'drop-with-files': dropFiles.length > 0
        }"
        class="needsclick dz-clickable dz-started text-center col-md-12"
      >
        <h3
          id="dropLabel_{{ _dropzoneId }}"
          class="drop-label dz-message needsclick"
          *ngIf="(!dropFiles || dropFiles.length === 0) && !dropLabel"
        >
          <b>Arraste ou Clique</b> para adicionar arquivos
        </h3>
        <h3
          id="dropLabelWithFiles_{{ _dropzoneId }}"
          class="drop-label-with-files dz-message needsclick"
          *ngIf="dropFiles.length > 0 && !dropLabelWithFiles"
        >
          <b>Arraste ou Clique</b> para adicionar mais arquivos
        </h3>

        <h3
          id="customDropLabel_{{ _dropzoneId }}"
          class="drop-label dz-message needsclick"
          *ngIf="(!dropFiles || dropFiles.length === 0) && dropLabel"
        >
          {{ dropLabel }}
        </h3>
        <h3
          id="customDropLabelWithFiles_{{ _dropzoneId }}"
          class="drop-label-with-dropFiles dz-message needsclick"
          *ngIf="dropFiles.length > 0 && dropLabelWithFiles"
        >
          {{ dropLabelWithFiles }}
        </h3>

        <div
          id="dropzonePreviewContainer_{{ _dropzoneId }}"
          class="d-flex flex-row flex-wrap "
          style="width:max-content;"
          *ngIf="dropFiles.length > 0 && !dropLabelWithFiles"
        >
          <div
            id="dropzonePreview_{{ _dropzoneId }}_{{ file.id }}"
            id="dropzone-preview"
            *ngFor="let file of dropFiles"
            style="margin-bottom: 2em !important;"
            class="col-sm-4 justify-content-left"
          >
            <div
              *ngIf="file.accepted"
              id="dropzonePreviewFileAccept_{{ _dropzoneId }}_{{ file.id }}"
            >
              <div class="d-flex flex-row col-sm">
                <img
                  id="dropzonePreviewFileAcceptImage_{{ _dropzoneId }}_{{
                    file.id
                  }}"
                  src="{{ file.dataURL }}"
                  class="preview-img float-left"
                  alt="{{ file.name }}"
                  *ngIf="file.type.includes('image/')"
                />
                <img
                  id="dropzonePreviewFileAcceptTemplateImage_{{
                    _dropzoneId
                  }}_{{ file.id }}"
                  src="../assets/img/file.svg"
                  class="preview-img float-left"
                  alt="{{ file.name }}"
                  *ngIf="!file.type.includes('image/')"
                />
                <h2
                  class="ml-2"
                  (click)="removeFile(file)"
                  id="dropzonePreviewFileAcceptTrash_{{ _dropzoneId }}_{{
                    file.id
                  }}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                    />
                  </svg>
                </h2>
              </div>
              <div style="max-width: 75%; text-align: left;" class="mt-2">
                <label
                  id="dropzonePreviewFileAcceptFileName_{{ _dropzoneId }}_{{
                    file.id
                  }}"
                  class="dropzone-preview-label-name"
                  >{{ file.name }}</label
                >
                <br />
                <label
                  [ngClass]="{
                    'label-success': file.accepted,
                    'label-danger': !file.accepted
                  }"
                  id="dropzonePreviewFileAcceptFileImageInfo_{{
                    _dropzoneId
                  }}_{{ file.id }}"
                  class="dropzone-preview-label-information float-left"
                  *ngIf="file.type.includes('image/')"
                  >{{ file.width }} x {{ file.height }} (
                  {{ file.size | filesize }} )</label
                >
                <label
                  id="dropzonePreviewFileAcceptFileInfo_{{ _dropzoneId }}_{{
                    file.id
                  }}"
                  [ngClass]="{
                    'label-success': file.accepted,
                    'label-danger': !file.accepted
                  }"
                  class="dropzone-preview-label-information float-left"
                  *ngIf="!file.type.includes('image/')"
                  >( {{ file.size | filesize }} )</label
                >
              </div>
            </div>
            <div
              id="dropzonePreviewFileDoesntAccept_{{ _dropzoneId }}_{{
                file.id
              }}"
              *ngIf="!file.accepted"
              [satPopoverAnchor]="p"
              (mouseenter)="p.open()"
              (mouseleave)="p.close()"
            >
              <div class="d-flex flex-row col-sm">
                <img
                  id="dropzonePreviewFileDoesntAcceptImage_{{ _dropzoneId }}_{{
                    file.id
                  }}"
                  src="{{ file.dataURL }}"
                  class="preview-img float-left"
                  alt="{{ file.name }}"
                  *ngIf="file.type.includes('image/')"
                />
                <img
                  id="dropzonePreviewFileDoesntAcceptTermplateImage_{{
                    _dropzoneId
                  }}_{{ file.id }}"
                  src="../assets/img/file.svg"
                  class="preview-img float-left"
                  alt="{{ file.name }}"
                  *ngIf="!file.type.includes('image/')"
                />
                <h2
                  id="dropzonePreviewFileDoesntAcceptTrash_{{ _dropzoneId }}_{{
                    file.id
                  }}"
                  class="ml-2"
                  (click)="removeFile(file)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                    />
                  </svg>
                </h2>
              </div>
              <div style="max-width: 75%; text-align: left;" class="mt-2">
                <label
                  id="dropzonePreviewFileDoesntAcceptFileName_{{
                    _dropzoneId
                  }}_{{ file.id }}"
                  class="dropzone-preview-label-name"
                  >{{ file.name }}</label
                >
                <br />
                <label
                  id="dropzonePreviewFileAcceptFileImageInfo_{{
                    _dropzoneId
                  }}_{{ file.id }}"
                  [ngClass]="{
                    'label-success': file.accepted,
                    'label-danger': !file.accepted
                  }"
                  class="dropzone-preview-label-information float-left"
                  *ngIf="file.type.includes('image/')"
                  >{{ file.width }} x {{ file.height }} (
                  {{ file.size | filesize }} )</label
                >
                <label
                  id="dropzonePreviewFileDoesntAcceptFileInfo_{{
                    _dropzoneId
                  }}_{{ file.id }}"
                  [ngClass]="{
                    'label-success': file.accepted,
                    'label-danger': !file.accepted
                  }"
                  class="dropzone-preview-label-information float-left"
                  *ngIf="!file.type.includes('image/')"
                  >( {{ file.size | filesize }} )</label
                >
              </div>
              <sat-popover
                #p
                horizontalAlign="start"
                verticalAlign="below"
                forceAlignment
                id="dropzonePreviewFileDoesntAcceptPopover_{{ _dropzoneId }}_{{
                  file.id
                }}"
              >
                <div class="dropzone-tooltip">
                  <div class="tooltip-content">
                    {{ file.errorMessage }}
                  </div>
                </div>
              </sat-popover>
            </div>
          </div>
        </div>
        <div id="dropzone-preview-disabled">
          <div
            class="dz-preview dz-file-preview"
            style="visibility: hidden;"
          ></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dropzone.component.css'],
})
export class DropzoneComponent implements AfterViewInit, OnInit {
  dropContent: Dropzone;
  _dropzoneId: string;
  _multipleFile: boolean;
  _acceptedFiles: string;
  _fileTypeNotAcceptedMessage: string;
  _exceededSizeLimitMessage: string;
  @Input() Id: string;
  @Input() multipleFile: boolean;
  @Input() dropLabel: string;
  @Input() dropLabelWithFiles: string;
  @Input() maxFileSizeBytes: number;
  @Input() acceptedFiles: string;
  @Input() fileTypeNotAcceptedMessage: string;
  @Input() exceededSizeLimitMessage: string;
  @Output() filesAdded = new EventEmitter<FileAddedOutput>();
  @Output() filesRemoved = new EventEmitter<FileRemovedOutput>();
  @ViewChild('dropzone', { read: ElementRef }) dropzone: ElementRef;

  tempFiles: Array<any> = [];
  dropFiles: Array<FileDropzone> = [];

  public constructor() {}
  ngOnInit(): void {
    if (!this.Id || this.Id.length === 0) {
      this._dropzoneId = this.generateRandomId(7);
    } else {
      this._dropzoneId = this.Id;
    }
    if (!this.multipleFile) {
      this._multipleFile = false;
    } else {
      this._multipleFile = this._multipleFile;
    }
    if (!this.acceptedFiles || this.acceptedFiles.length === 0) {
      this._acceptedFiles = '*';
    } else {
      this._acceptedFiles = this.acceptedFiles;
    }
    if (
      !this.fileTypeNotAcceptedMessage ||
      this.fileTypeNotAcceptedMessage.length === 0
    ) {
      this._fileTypeNotAcceptedMessage = 'Este tipo de arquivo não é aceito';
    } else {
      this._fileTypeNotAcceptedMessage = this.fileTypeNotAcceptedMessage;
    }

    if (
      !this.exceededSizeLimitMessage ||
      this.exceededSizeLimitMessage.length === 0
    ) {
      this._exceededSizeLimitMessage =
        'Este arquivo ultrapassou limite de tamanho configurado';
    } else {
      this._exceededSizeLimitMessage = this.exceededSizeLimitMessage;
    }
  }

  ngAfterViewInit(): void {
    this.dropContent = new Dropzone('div#' + this._dropzoneId, {
      url: '/upload',
      autoQueue: false,
      autoProcessQueue: false,
      addedfiles: (files) => {
        this.tempFiles.push(...files);
        this.tempFiles.forEach((f) => {
          if (!this.dropFiles.find((d) => d.name === f.name)) {
            let fileData = new FileDropzone();
            fileData.id = uuidv4();
            fileData.name = f.name;
            fileData.dataURL = f.dataURL;
            fileData.height = f.height;
            fileData.lastModifiedDate = f.lastModifiedDate;
            fileData.size = f.size;
            fileData.type = f.type;
            fileData.width = f.width;
            fileData.accepted = f.accepted;
            let reg = new RegExp(this.acceptedFiles);
            if (!reg.test(fileData.type)) {
              fileData.errorMessage = this._fileTypeNotAcceptedMessage;
              fileData.accepted = false;
              this.dropFiles.push(fileData);
            } else {
              if (this.maxFileSizeBytes) {
                if (f.size > this.maxFileSizeBytes) {
                  fileData.errorMessage = this._exceededSizeLimitMessage;
                  fileData.accepted = false;
                  this.dropFiles.push(fileData);
                } else {
                  fileData.accepted = true;
                  this.dropFiles.push(fileData);
                }
              } else {
                fileData.accepted = true;
                this.dropFiles.push(fileData);
              }
            }
          }
        });
        // (this.dropContent.options.clickable = `#dropzonePreviewContainer_${this._dropzoneId}`),
        this.filesAdded.emit({ files: this.dropFiles });
      },
      thumbnail: (file: any, dataURL) => {
        this.dropFiles.forEach((d) => {
          if (d.name === file.name) {
            d.dataURL = dataURL;
            d.height = file.height;
            d.width = file.width;
          }
        });
      },
      previewTemplate: document.getElementById('dropzone-preview-disabled')
        .innerHTML,
    });
    console.log(this.dropContent);
  }
  removeFile(file: FileDropzone) {
    this.dropFiles = this.dropFiles.filter((d) => {
      return d !== file;
    });

    this.filesRemoved.emit({ files: this.dropFiles, removedFile: file });
  }
  generateRandomId(length: number): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
export class FileDropzone {
  id: string;
  dataURL: string;
  accepted: boolean;
  height?: number;
  width?: number;
  lastModifiedDate: Moment;
  name: string;
  type: string;
  size: number;
  errorMessage: string;
}

export class FileRemovedOutput {
  removedFile: FileDropzone;
  files: Array<FileDropzone>;
}
export class FileAddedOutput {
  files: Array<FileDropzone>;
}
