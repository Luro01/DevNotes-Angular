import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notes } from '../../../Interface/Notes';
import { faX} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule,FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  @Input() note!:Notes;
  @Output() exclude = new EventEmitter<Notes>();
  @Output() fixar = new EventEmitter<Notes>();
  @Output() salvar = new EventEmitter<any>();

  faX=faX;
  faThumbtack=faThumbtack
  faFloppyDisk=faFloppyDisk;


  handleClick(event: MouseEvent, id: any) {
    this.animation(event); 
    setTimeout(() => {
      this.onDelete(id); 
  }, 1160); 
       
  }
  animation(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const div1 = target.closest('.actions');
    const div2 = div1?.closest('.notes'); 
    if (div2) {
        div2.classList.add('fall'); 
    }
}
  
  onDelete(id:any){
    this.exclude.emit(id);
  }

  onSave(note: Notes) {
    const textarea = note.description; 
    console.log(textarea); 
    this.salvar.emit({ textarea, note });
}


  onFix(note:Notes){

    this.fixar.emit(note);
  }
}
