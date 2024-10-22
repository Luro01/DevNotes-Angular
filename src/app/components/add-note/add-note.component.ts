import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Notes } from '../../../Interface/Notes';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  @Output() onAdiconarNota = new EventEmitter<Notes>();
  @Output() fecharModal = new EventEmitter<boolean>();
  notesForm: FormGroup;
  faX =faX;



  constructor() {
    this.notesForm = new FormGroup({
      id: new FormControl(null), 
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      priority: new FormControl(false) 
    });
  }

  onSubmit() {
    const newNote: Notes = this.notesForm.value;
    if(newNote.title && newNote.description){
      this.onAdiconarNota.emit(newNote);
      this.notesForm.reset();
      this.onfecharModal();
    }

  }
  
  onfecharModal(){
    this.fecharModal.emit()
  }
}
