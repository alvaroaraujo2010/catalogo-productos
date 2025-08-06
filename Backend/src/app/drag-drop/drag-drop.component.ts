import { Component, OnInit } from '@angular/core';
import { DragDropModule, CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { PositionService } from '../services/position.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule, DragDropModule, SharedModule],
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
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
