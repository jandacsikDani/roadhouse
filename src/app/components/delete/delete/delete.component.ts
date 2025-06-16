import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MenuService } from '../../../shared/services/menu/menu.service';
import { Food } from '../../../shared/models/Food';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input() food: Food | null = null

  @Output() yes = new EventEmitter<void>;
  @Output() no = new EventEmitter<void>;

  delete(){
    this.yes.emit();
  }
  cancel(){
    this.no.emit();
  }
}

