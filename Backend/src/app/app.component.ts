import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropModule, CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { PositionService } from '../app/services/position.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../app/shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, DragDropModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drag-drop-app';

  positions: { [key: string]: { x: number; y: number } } = {};

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    this.positionService.getPositions().subscribe(positions => {
      this.positions = positions;
    });
  }

  savePosition() {
    for (const [id, position] of Object.entries(this.positions)) {
      this.positionService.savePosition(id, position).subscribe(() => {
        console.log(`Posición de ${id} guardada`);
      });
    }
    alert('Posición guardada!');
  }

  onDragEnded(event: CdkDragEnd) {
    const elementId = event.source.data.id;
    const position = event.source.getFreeDragPosition();
    this.positions[elementId] = { x: position.x, y: position.y };
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('Elemento soltado en la zona de destino');
  }

  getTransform(id: string): string {
    const position = this.positions[id];
    return position ? `translate(${position.x}px, ${position.y}px)` : '';
  }
}
