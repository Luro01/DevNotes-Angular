import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Notes } from '../../Interface/Notes';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private url= "http://localhost:3000/notes/"
  private http = inject(HttpClient)
  constructor() { }

  getAll(): Observable<Notes[]>{
    return this.http.get<Notes[]>(this.url);
  }

  exclude(id: any):Observable<Notes>{
    return this.http.delete<Notes>(this.url + id);
  }

  atualizar(note:Notes,id:any):Observable<Notes>{
    return this.http.patch<Notes>(`${this.url}${id}`, note);
  }

  addNote(notes:Notes):Observable<Notes>{
    return this.http.post<Notes>(this.url,notes);
  }
}
