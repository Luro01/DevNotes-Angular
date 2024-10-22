import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainContainerComponent } from './components/main-container/main-container.component';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainContainerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Notes';
 
  
}
