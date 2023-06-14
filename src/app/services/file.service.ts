import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private server = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // define function to upload file
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  process(): Observable<any> {
    return this.http.get(`${this.server}/file/processDoc`,{
      responseType: 'json',
    });
  }

  getFileById(id:number):Observable<any>{
    return this.http.get<any>(`${this.server}/file/listAll/${id}`);
  }


  // define function to download file
  download(filename: string): Observable<HttpEvent<any>> {
    return this.http.get(`${this.server}/file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }
}
