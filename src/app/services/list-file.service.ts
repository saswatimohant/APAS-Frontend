import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from './fileu';

@Injectable({
  providedIn: 'root',
})
export class ListFileService {
  private server = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getFileList(): Observable<File[]> {
    return this.http.get<File[]>(`${this.server}/file/listAll`);
  }

  getFileByName(filename: string): Observable<File> {
    return this.http.get<File>(`http://localhost:8080/file/download/${filename}`);
  }

  updateFile(id: number, file: File): Observable<Object> {
    return this.http.put(`${this.server}/file/update/${id}`,file);
  }

  deleteFile(id: number): Observable<Object>{
    return this.http.delete(`${this.server}/file/delete/${id}`);
  }
}
