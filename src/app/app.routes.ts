import { Routes } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { ContainersSecundariosComponent } from './components/containers-secundarios/containers-secundarios.component';

export const routes: Routes = [
    {path:"",component:MainContainerComponent},
    {path:'secundario/:lista',component:MainContainerComponent}
];
