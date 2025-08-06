import { Routes } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';

export const routes: Routes = [
  { path: 'Prueba', component: DragDropComponent },
  { path: '', pathMatch: 'full' }
];