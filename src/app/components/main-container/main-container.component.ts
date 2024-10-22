import { Component, inject, OnInit } from '@angular/core';
import { NotesComponent } from '../notes/notes.component';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { Notes } from '../../../Interface/Notes';
import { AddNoteComponent } from '../add-note/add-note.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [NotesComponent, CommonModule,AddNoteComponent],
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  notes: Notes[] = [];
  modalOpen=false;
  private service = inject(MasterService);
  private route = inject(ActivatedRoute)
  
  ngOnInit(): void {
    this.getNotes();
  
    this.route.paramMap.subscribe(params => {
      const listaParam = params.get('lista'); 
      if (listaParam) {
        try {
          const decodedString = decodeURIComponent(listaParam);
          this.notes = JSON.parse(decodedString);
          console.log(this.notes); 
        } catch (error) {
          console.error('Erro ', error); 
        }
      }
    });
  }
  

  getNotes() {
    this.service.getAll().subscribe((data: Notes[]) => {
      this.notes = data.sort((a, b) => {
        return (a.priority === b.priority) ? 0 : a.priority ? -1 : 1;
      });
    });
  }

  exludeNote(id: any) {
    this.service.exclude(id).subscribe(() => {
      this.notes = this.notes.filter(element => element.id !== id);
    });
  }

  fixNotes(note: Notes) {
    note.priority = !note.priority;
    this.service.atualizar(note, note.id).subscribe({
      next: (response) => {
        const index = this.notes.findIndex(n => n.id === note.id);
        if (index !== -1) {
          this.notes[index] = response;
          this.notes.sort((a, b) => {
            return (a.priority === b.priority) ? 0 : a.priority ? -1 : 1;
          });
        }
      }
    });
  }


  toggleModal(){
    this.modalOpen=!this.modalOpen;
  }


  addNotes(note: Notes) {
    if (note.id === null) {
      delete note.id; 
    }
    this.service.addNote(note).subscribe(() => {
      this.getNotes(); 
    }, error => {
      console.error('Erro ao adicionar a nota:', error); 
    });
  }
  saveEdit(objeto: { textarea: string, note: Notes }) {
      objeto.note.description =objeto.textarea;
      console.log(objeto.note.description)
      this.service.atualizar(objeto.note,objeto.note.id).subscribe(()=>{
        this.getNotes();
      })
  }
  
  


}
