import { Component, inject, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Notes } from '../../../Interface/Notes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  faMagnifyingGlass = faMagnifyingGlass
  search: string = '';
  notes:Notes[]=[]

  private service = inject(MasterService);
  private router = inject(Router)

  ngOnInit(): void {
      this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe((data)=>{
      this.notes = data;
    })
  }

  searchs(){
    if(this.search != ""){
      const filteredNotes = this.notes.filter((element) =>
        element.description.toLowerCase().includes(this.search.toLowerCase())
      );
      this.passarLista(filteredNotes);
    }else{
      this.router.navigate([''])
    }

    this.search = "";

  }

  passarLista(filteredNotes: Notes[]){
    const listaString = JSON.stringify(filteredNotes);
    this.router.navigate(['/secundario', encodeURIComponent(listaString)]); 
  }

  }


   
  


