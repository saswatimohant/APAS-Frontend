import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { FileService } from 'src/app/services/file.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
})
export class UploadfileComponent implements OnInit {
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private fileService: FileService, private router: Router) {}

  ngOnInit(): void {}

  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.fileService.upload(formData).subscribe(
      (event) => {
        console.log(event);
        this.reportProgress(event);
       
        this.router.navigate(['listFile'])
      
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  // define a function to download files
  onDownloadFiles(filename: string): void {
    this.fileService.download(filename).subscribe(
      (event) => {
        this.router.navigate(['login'])
        //this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        Swal.fire('Success','File'+null+' Uploading','success');
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;

      case HttpEventType.DownloadProgress:
        this.updateStatus(
          httpEvent.loaded,
          httpEvent.total!,
          'Downloading... '
        );
        break;

      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;

      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          // download logic
          saveAs(
            new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, {
              type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`,
            })
          );
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }
  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((100 * loaded) / total);
  }
}
